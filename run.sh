#!/usr/bin/env bash
#
# Malina Garden -- one-command runner.
#
#   ./run.sh              start the dev server (default)
#   ./run.sh dev          same as above
#   ./run.sh build        production build -> dist/
#   ./run.sh preview      build, then serve dist/ locally
#   ./run.sh lint         run oxlint
#   ./run.sh install      (re)install dependencies
#   ./run.sh clean        remove node_modules and dist
#
# Extra arguments are forwarded to Vite, e.g.
#   ./run.sh dev --port 3000 --open
#   ./run.sh dev --host            # expose on the LAN
#
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

if [ -t 1 ]; then
  BOLD=$'\033[1m'; GREEN=$'\033[32m'; YELLOW=$'\033[33m'; RED=$'\033[31m'; RESET=$'\033[0m'
else
  BOLD=""; GREEN=""; YELLOW=""; RED=""; RESET=""
fi

info() { printf '%s==>%s %s\n' "$GREEN$BOLD" "$RESET" "$*"; }
warn() { printf '%s==>%s %s\n' "$YELLOW$BOLD" "$RESET" "$*" >&2; }
die()  { printf '%serror:%s %s\n' "$RED$BOLD" "$RESET" "$*" >&2; exit 1; }

# Vite 8 requires Node ^20.19.0 || >=22.12.0
check_node() {
  command -v node >/dev/null 2>&1 || die "node is not installed. Install Node.js 22 LTS: https://nodejs.org"
  command -v npm  >/dev/null 2>&1 || die "npm is not installed (it ships with Node.js)."

  local version major minor
  version="$(node -v)"; version="${version#v}"
  major="${version%%.*}"
  minor="${version#*.}"; minor="${minor%%.*}"

  if [ "$major" -lt 20 ] \
    || { [ "$major" -eq 20 ] && [ "$minor" -lt 19 ]; } \
    || [ "$major" -eq 21 ] \
    || { [ "$major" -eq 22 ] && [ "$minor" -lt 12 ]; }; then
    die "Node $version is too old. Vite 8 needs ^20.19.0 or >=22.12.0."
  fi
}

# Install when node_modules is missing, or when the lockfile changed since the
# last install -- npm stamps node_modules/.package-lock.json on every install.
deps_are_stale() {
  [ -d node_modules ] || return 0
  [ -f node_modules/.package-lock.json ] || return 0
  [ package-lock.json -nt node_modules/.package-lock.json ] && return 0
  return 1
}

install_deps() {
  if [ -f package-lock.json ]; then
    info "Installing dependencies (npm ci)..."
    npm ci
  else
    info "Installing dependencies (npm install)..."
    npm install
  fi
}

ensure_deps() {
  if deps_are_stale; then
    install_deps
  else
    info "Dependencies up to date."
  fi
}

cmd="${1:-dev}"
if [ $# -gt 0 ]; then shift; fi

case "$cmd" in
  dev|start)
    check_node; ensure_deps
    info "Starting dev server -- http://localhost:5173 (Ctrl-C to stop)"
    exec npm run dev -- "$@"
    ;;
  build)
    check_node; ensure_deps
    info "Building for production..."
    npm run build -- "$@"
    info "Build complete -- output in dist/"
    ;;
  preview|serve)
    check_node; ensure_deps
    info "Building for production..."
    npm run build
    info "Serving the production build -- http://localhost:4173 (Ctrl-C to stop)"
    exec npm run preview -- "$@"
    ;;
  lint)
    check_node; ensure_deps
    exec npm run lint -- "$@"
    ;;
  install|setup)
    check_node
    install_deps
    info "Done. Run ./run.sh to start the dev server."
    ;;
  clean)
    info "Removing node_modules/ and dist/..."
    rm -rf node_modules dist
    info "Clean. Run ./run.sh install to reinstall."
    ;;
  -h|--help|help)
    awk 'NR > 2 { if ($0 !~ /^#/) exit; sub(/^# ?/, ""); print }' "${BASH_SOURCE[0]}"
    ;;
  *)
    die "unknown command '$cmd'. Try: ./run.sh --help"
    ;;
esac
