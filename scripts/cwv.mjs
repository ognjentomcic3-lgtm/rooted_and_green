#!/usr/bin/env node
// Core Web Vitals in one command, in a dozen lines of output.
//
// Everything this does is deterministic: build, serve, drive Chrome, read
// three numbers, compare them against Google's thresholds. None of it needs
// judgement, so none of it should cost anyone — a person or an agent — a
// 500KB report to read. The exit code is the verdict; the lines exist for
// whoever wants to know why.
//
//   npm run cwv                                  the homepage
//   npm run cwv -- / /projects/some-slug          any set of routes
//   npm run cwv -- --json                         the same numbers, machine-shaped
//   npm run cwv -- --no-build                     reuse the dist that is there
//
// One browser, reused across routes. The Lighthouse CLI pays a fresh Chrome
// launch (and, invoked through `npx -y`, a fresh download) per page, which is
// most of what makes the obvious approach slow.

import { spawn } from 'node:child_process';
import process from 'node:process';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

// Google's "good" boundaries. TBT stands in for INP, which cannot be measured
// without a real finger on a real screen.
const GOOD = { lcp: 2500, cls: 0.1, tbt: 200 };
const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const build = !argv.includes('--no-build');
const routes = argv.filter((a) => !a.startsWith('--'));
if (routes.length === 0) routes.push('/');

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'ignore' });
    p.on('error', reject);
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });

// Resolves once the preview server answers, so the first route is not measured
// against a socket that is not listening yet.
async function waitForServer(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(ORIGIN, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return;
    } catch {
      // Not up yet.
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview server never answered on ${ORIGIN}`);
}

function summarise(lhr) {
  const a = lhr.audits;
  const num = (k) => a[k]?.numericValue ?? NaN;
  const phases = {};
  for (const group of a['largest-contentful-paint-element']?.details?.items ?? []) {
    for (const item of group.items ?? []) {
      if (item.phase) phases[item.phase] = Math.round(item.timing);
    }
  }
  // Enough of the element to recognise it, never the whole snippet.
  const snippet =
    a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet ?? '';
  const el = (snippet.match(/<(\w+)/)?.[1] ?? '?') + (snippet.match(/([\w.-]+\.(?:webp|avif|jpe?g|png|svg))/)?.[1] ? ` ${snippet.match(/([\w.-]+\.(?:webp|avif|jpe?g|png|svg))/)[1]}` : '');

  const lcp = Math.round(num('largest-contentful-paint'));
  const cls = Number(num('cumulative-layout-shift').toFixed(3));
  const tbt = Math.round(num('total-blocking-time'));
  const failed = [
    lcp > GOOD.lcp ? 'LCP' : null,
    cls > GOOD.cls ? 'CLS' : null,
    tbt > GOOD.tbt ? 'TBT' : null,
  ].filter(Boolean);

  // The single biggest thing worth doing, when there is one.
  const top = Object.values(a)
    .filter((x) => x.details?.overallSavingsMs >= 100 && (x.score ?? 1) < 0.9)
    .sort((x, y) => y.details.overallSavingsMs - x.details.overallSavingsMs)[0];

  return {
    score: Math.round((lhr.categories.performance.score ?? 0) * 100),
    lcp,
    cls,
    tbt,
    failed,
    phases,
    lcpElement: el.trim(),
    topFix: top ? `${top.title} (~${Math.round(top.details.overallSavingsMs)}ms)` : null,
  };
}

let server;
let chrome;
try {
  if (build) await run('node_modules/.bin/vite', ['build']);
  server = spawn('node_modules/.bin/vite', ['preview', '--port', String(PORT)], {
    stdio: 'ignore',
  });
  await waitForServer();
  chrome = await launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'],
  });

  const results = {};
  for (const route of routes) {
    const { lhr } = await lighthouse(
      ORIGIN + route,
      { port: chrome.port, output: 'json', logLevel: 'error' },
      undefined,
    );
    results[route] = summarise(lhr);
  }

  if (asJson) {
    console.log(JSON.stringify({ thresholds: GOOD, routes: results }, null, 2));
  } else {
    console.log('route'.padEnd(34) + 'score   LCP      CLS     TBT');
    for (const [route, r] of Object.entries(results)) {
      console.log(
        route.slice(0, 33).padEnd(34) +
          String(r.score).padStart(3) +
          `  ${r.lcp}ms`.padEnd(11) +
          String(r.cls).padEnd(8) +
          `${r.tbt}ms`.padEnd(7) +
          (r.failed.length ? `FAIL ${r.failed.join(',')}` : 'pass'),
      );
    }
    // Only failing routes explain themselves — a green run stays four lines.
    for (const [route, r] of Object.entries(results)) {
      if (!r.failed.length) continue;
      const ph = Object.entries(r.phases)
        .map(([k, v]) => `${k.toLowerCase().replace(' ', '-')} ${v}`)
        .join('  ');
      console.log(`  ${route}  LCP <${r.lcpElement}>`);
      if (ph) console.log(`    ${ph}`);
      if (r.topFix) console.log(`    biggest win: ${r.topFix}`);
    }
  }

  const bad = Object.values(results).filter((r) => r.failed.length).length;
  console.log(
    `\n${bad ? `${bad}/${routes.length} route(s) outside "good"` : `all ${routes.length} route(s) good`}` +
      `  (lcp<=${GOOD.lcp}ms cls<=${GOOD.cls} tbt<=${GOOD.tbt}ms, lab/mobile)`,
  );
  process.exitCode = bad ? 1 : 0;
} catch (err) {
  console.error('cwv failed:', err.message);
  process.exitCode = 2;
} finally {
  await chrome?.kill();
  server?.kill();
}
