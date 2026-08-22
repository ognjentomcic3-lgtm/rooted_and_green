# 🌿 Rooted & Green

_Gardens that live with you._

A front-end-only React + Vite blog site for a garden design & maintenance
business. Posts are seeded on first run and persisted entirely in the browser's
`localStorage` — no backend, no build-time data, no real auth.

## Stack

- **React 19** + **Vite**
- **react-router-dom** — routing
- **react-markdown** — renders post bodies (headings, lists, emphasis, and
  inline images)
- **localStorage** — the single source of truth for posts

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # oxlint
npm run scan     # Trivy security scan (see Security scanning)
```

## Pages

| Route         | Page      | Purpose                                               |
| ------------- | --------- | ----------------------------------------------------- |
| `/`           | Landing   | Hero, services, latest 3 posts, call-to-action        |
| `/blog`       | Blog list | All posts as cards, with search + category filter     |
| `/blog/:slug` | Post      | Cover image, meta, Markdown body (with inline images) |
| `/admin`      | Admin     | Table of posts + create / edit / delete (open panel)  |

## How the data works

- `src/data/seedData.js` — ~5 garden-themed sample posts, each with a cover
  image and a Markdown `content` field containing an inline image, headings,
  and lists.
- `src/hooks/usePosts.js` — the shared hook and single source of truth. It
  loads from `localStorage` (seeding on first run) and exposes `getAll`,
  `getBySlug`, `create`, `update`, and `remove`. Every page uses it, so admin
  edits appear instantly on the public pages. It also syncs across open tabs.

To reset all data back to the seed posts, clear the site's `localStorage`
(key: `rooted-and-green:posts`).

## Security scanning

[Trivy](https://trivy.dev) scans this repo for vulnerable npm packages,
committed secrets, and infrastructure misconfiguration.

```bash
npm run scan     # everything, every severity — what you want locally
npm run scan:ci  # exactly what CI fails on
```

Both read `trivy.yaml`, so local output matches the pipeline. Install Trivy
first:

```bash
brew install trivy                                    # macOS
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh \
  | sudo sh -s -- -b /usr/local/bin                   # Linux
```

### What CI does

`.github/workflows/security.yml` runs on every push to `main`, every PR, and
weekly on Monday — the dependency tree sits still, the advisory feed does not.
It scans twice:

1. **Full report** — every severity, never fails. Results land in the
   repository's **Security → Code scanning** tab and are kept as a build
   artifact for 30 days.
2. **Gate** — fails the build only on `HIGH`/`CRITICAL` findings that have a
   fix available, plus any detected secret.

The split is deliberate: unfixable and low-severity findings stay visible
without blocking anyone, while anything actionable stops the build.

Publishing to code scanning needs a public repo or GitHub Advanced Security. On
a private repo without it that step is skipped and the gate still runs — the
findings are in the step log and the uploaded artifact either way.

### Accepting a finding

Add its ID to `.trivyignore` with a reason and a review date. Prefer fixing.

### Scope, and what it will not catch

- `devDependencies` are excluded (`pkg.include-dev-deps: false`) — vite, oxlint
  and `@types/*` never reach a browser, so their CVEs are noise here. Revisit
  if this repo ever grows a server-side build.
- `node_modules/` and `dist/` are skipped; `package-lock.json` is the source of
  truth for the dependency tree.
- Trivy's built-in allow-rules suppress secrets found in paths that look like
  test fixtures — anything with `test`, `example`, or `sample` in the name. A
  real credential parked in such a file is **not** reported.
- Misconfiguration scanning covers Dockerfile, Terraform, Kubernetes, and
  Ansible. This repo has none of those today, so that scanner is a tripwire for
  the future; it does not check `deploy/nginx/*.conf` or the workflow files.
- Deploys are **not** blocked by this scan — `Security` and `Deploy` are
  separate workflows. To require it, make the `Trivy` check a required status
  check in branch protection, or move the job into `deploy.yml`.

## Notes / limitations

- No real authentication — the admin panel is intentionally open.
- Images are URLs only (no uploads); all sample imagery uses
  `picsum.photos` seeded URLs, so they load without any API key.
- Data lives in the browser, so it does not sync between devices.
