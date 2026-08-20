#!/usr/bin/env bash
#
# One-time provisioning for a fresh Hetzner box (Ubuntu/Debian).
# Run as root ON THE SERVER:
#
#   scp -i ~/.ssh/hetzner -r deploy root@YOUR_SERVER_IP:/tmp/
#   ssh -i ~/.ssh/hetzner root@YOUR_SERVER_IP \
#     'bash /tmp/deploy/provision.sh --domain example.com --ci-key "ssh-ed25519 AAAA... ci@rooted-and-green"'
#
# Idempotent: safe to re-run, except that it overwrites the nginx vhost
# (which certbot rewrites on first TLS issuance — see the note in the conf).

set -euo pipefail

DOMAIN=""
DEPLOY_USER="deploy"
CI_KEY=""
WEBROOT="/var/www/rooted-and-green"
SITE_NAME="rooted-and-green"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

usage() {
  cat <<'USAGE'
Usage: provision.sh --domain <domain> --ci-key <public key> [--user <name>]

  --domain   Domain the site answers on. Use the server IP if you have no
             domain yet; TLS will then be skipped.
  --ci-key   The PUBLIC half of the deploy key GitHub Actions will use.
  --user     Unix user that owns the webroot (default: deploy).
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain)  DOMAIN="$2"; shift 2 ;;
    --ci-key)  CI_KEY="$2";  shift 2 ;;
    --user)    DEPLOY_USER="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "unknown argument: $1" >&2; usage; exit 1 ;;
  esac
done

[[ -n "$DOMAIN" ]] || { echo "error: --domain is required" >&2; exit 1; }
[[ -n "$CI_KEY"  ]] || { echo "error: --ci-key is required" >&2; exit 1; }
[[ $EUID -eq 0   ]] || { echo "error: run this as root" >&2; exit 1; }

# A bare IP can never get a Let's Encrypt certificate, so treat it as a
# domainless install: catch-all server_name, no certbot.
if [[ "$DOMAIN" =~ ^[0-9.]+$ || "$DOMAIN" == *:* ]]; then
  IS_IP=1
  SERVER_NAME="_"
  DEFAULT_SERVER=" default_server"
else
  IS_IP=0
  SERVER_NAME="$DOMAIN"
  DEFAULT_SERVER=""
fi

echo "==> Installing packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx rsync ufw
if [[ $IS_IP -eq 0 ]]; then
  apt-get install -y -qq certbot python3-certbot-nginx
fi

echo "==> Creating deploy user: $DEPLOY_USER"
if ! id -u "$DEPLOY_USER" >/dev/null 2>&1; then
  # Needs a real shell — rsync-over-ssh runs a command on login.
  adduser --disabled-password --gecos "" --shell /bin/bash "$DEPLOY_USER"
fi

echo "==> Authorizing the CI deploy key"
DEPLOY_HOME="$(getent passwd "$DEPLOY_USER" | cut -d: -f6)"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$DEPLOY_HOME/.ssh"
touch "$DEPLOY_HOME/.ssh/authorized_keys"
grep -qxF "$CI_KEY" "$DEPLOY_HOME/.ssh/authorized_keys" \
  || echo "$CI_KEY" >> "$DEPLOY_HOME/.ssh/authorized_keys"
chmod 600 "$DEPLOY_HOME/.ssh/authorized_keys"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_HOME/.ssh"

echo "==> Preparing webroot: $WEBROOT"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 755 "$WEBROOT"
if [[ ! -f "$WEBROOT/index.html" ]]; then
  echo "<h1>Rooted &amp; Green</h1><p>Awaiting first deploy.</p>" > "$WEBROOT/index.html"
  chown "$DEPLOY_USER:$DEPLOY_USER" "$WEBROOT/index.html"
fi

echo "==> Installing nginx vhost for $DOMAIN (server_name $SERVER_NAME)"
sed -e "s/__SERVER_NAME__/$SERVER_NAME/g" \
    -e "s/__DEFAULT__/$DEFAULT_SERVER/g" \
    "$SCRIPT_DIR/nginx/$SITE_NAME.conf" \
  > "/etc/nginx/sites-available/$SITE_NAME"
ln -sfn "/etc/nginx/sites-available/$SITE_NAME" "/etc/nginx/sites-enabled/$SITE_NAME"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable --now nginx
systemctl reload nginx

echo "==> Configuring firewall"
ufw allow OpenSSH        >/dev/null
ufw allow 'Nginx Full'   >/dev/null
ufw --force enable       >/dev/null
ufw status verbose

if [[ $IS_IP -eq 1 ]]; then
  echo "==> Skipping TLS: '$DOMAIN' is an IP address, not a domain"
  echo "    When you get a domain: point its A record here, then re-run"
  echo "    provision.sh with --domain yourdomain.com"
else
  echo "==> Requesting TLS certificate for $DOMAIN"
  echo "    (needs DNS for $DOMAIN already pointing at this server)"
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
    --register-unsafely-without-email --redirect \
    || echo "!! certbot failed — check DNS, then re-run: certbot --nginx -d $DOMAIN"
fi

echo
echo "==> Done. Server is ready for CI deploys."
echo "    Webroot : $WEBROOT (owned by $DEPLOY_USER)"
echo "    Test    : curl -I http://$DOMAIN/"
