# Deploying Rooted & Green to Hetzner

Static build in CI → `rsync` over SSH → nginx serves `dist/`. Nothing runs on
the server but nginx.

```
push to main ──▶ GitHub Actions ──▶ npm ci · lint · build ──▶ rsync dist/
                                                                  │
                                                       Hetzner ◀──┘
                                                       nginx → /var/www/rooted-and-green
```

## Current deployment

| | |
|---|---|
| Server | `178.104.109.80` (Hetzner, Ubuntu 26.04) |
| URL | http://178.104.109.80/ |
| TLS | **None** — no domain yet, HTTP only |
| Webroot | `/var/www/rooted-and-green`, owned by `deploy` |
| Deploy user | `deploy` (shell login, no sudo) |
| CI key | `~/.ssh/rooted-and-green-ci` — separate from the personal `~/.ssh/hetzner` |
| Firewall | ufw active: 22, 80, 443 |

The server was provisioned with:

```bash
scp -i ~/.ssh/hetzner -r deploy root@178.104.109.80:/tmp/
ssh -i ~/.ssh/hetzner root@178.104.109.80 \
  "bash /tmp/deploy/provision.sh --domain 178.104.109.80 \
     --ci-key \"$(cat ~/.ssh/rooted-and-green-ci.pub)\""
```

`provision.sh` is idempotent — re-run it to repair the box or to rebuild it
from scratch.

## GitHub secrets and variables

Repo → Settings → Secrets and variables → Actions.

### Secrets (required)

| Name | Value |
|---|---|
| `SSH_PRIVATE_KEY` | Contents of `~/.ssh/rooted-and-green-ci` — the private half, BEGIN/END lines included |
| `SSH_HOST` | `178.104.109.80` |
| `SSH_USER` | `deploy` |
| `SSH_KNOWN_HOSTS` | Output of `ssh-keyscan 178.104.109.80` — pins the host key so a spoofed server can't harvest the deploy key |

Without `SSH_KNOWN_HOSTS` the workflow falls back to `ssh-keyscan` at run time
and logs a warning. It still deploys, but it trusts whatever answers first.

### Variables (optional)

| Name | Default | Purpose |
|---|---|---|
| `SITE_URL` | `http://$SSH_HOST` | URL the post-deploy smoke test hits |
| `DEPLOY_PATH` | `/var/www/rooted-and-green` | Webroot on the server |
| `SSH_PORT` | `22` | If SSH doesn't listen on 22 |

The workflow targets `environment: production`, so adding required reviewers to
that environment will gate deploys behind an approval.

## Deploying

Push to `main`, or **Actions → Deploy → Run workflow**.

Manual deploy from your machine, if CI is down — this is the same command the
workflow runs:

```bash
npm ci && npm run build
rsync -az --delete --exclude='.well-known' \
  -e "ssh -i ~/.ssh/rooted-and-green-ci" \
  dist/ deploy@178.104.109.80:/var/www/rooted-and-green/
```

## Verifying

```bash
curl -I http://178.104.109.80/
curl -o /dev/null -w '%{http_code}\n' http://178.104.109.80/projects/anything  # 200, not 404
ssh -i ~/.ssh/rooted-and-green-ci deploy@178.104.109.80 'ls -la /var/www/rooted-and-green'
```

## Rollback

Builds aren't retained on the server, so roll back by redeploying an older commit:

```bash
git revert <bad-commit> && git push
# or re-run the workflow against a known-good ref:
gh workflow run deploy.yml --ref <good-sha>
```

## Adding a domain later

1. Point an `A` record at `178.104.109.80`.
2. Re-run provisioning with the real domain — this installs certbot, swaps the
   catch-all `server_name _` for the domain, and issues a certificate:

   ```bash
   ssh -i ~/.ssh/hetzner root@178.104.109.80 \
     "bash /tmp/deploy/provision.sh --domain yourdomain.com \
        --ci-key \"$(cat ~/.ssh/rooted-and-green-ci.pub)\""
   ```
3. Set the `SITE_URL` variable to `https://yourdomain.com` so the smoke test
   checks the real URL.

Certbot rewrites the live vhost to add the TLS block and the :80 → :443
redirect. Re-running `provision.sh` after that overwrites those edits, so from
then on edit `/etc/nginx/sites-available/rooted-and-green` directly.

## Notes

- `rsync --delete` keeps the webroot exactly matching `dist/`; `.well-known` is
  excluded so it can't wipe an in-flight ACME challenge.
- `index.html` is served `no-cache`; `/assets/*` gets a one-year immutable
  cache, which is safe because Vite fingerprints those filenames.
- **`/admin` is unauthenticated and publicly reachable.** The panel only edits
  the visitor's own `localStorage`, so there's no shared data to damage, but
  anyone can open it. Add HTTP basic auth to the vhost if that's not wanted.
- The site currently runs over plain HTTP. Anything typed into `/admin` travels
  unencrypted.
