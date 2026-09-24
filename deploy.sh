#!/usr/bin/env bash
# Refresh iNaturalist data, re-render the page, and publish to GitHub Pages.
#
# Order matters: pull the latest observations + blind spots FIRST, then render,
# so a deploy never ships stale data. Push is over SSH (the personal-account key),
# so this does not touch your active `gh` account.
#
# Usage:  ./deploy.sh [inat-username]   (defaults to observer_sydney)
#         or:  pnpm deploy [inat-username]
set -euo pipefail

# Work from this script's own folder, whatever the current directory is.
cd "$(dirname "$0")"

user="${1:-observer_sydney}"
pages_url="https://sydneypemberton1986.github.io/inat-viewer/"

echo "==> Building viewer scripts (TypeScript -> dist/)..."
pnpm run build:viewers

echo "==> Updating observations + blind spots for ${user}..."
python3 inat_download.py "${user}"

echo "==> Rendering tree + missed pages into publish/..."
python3 render_tree.py "${user}" -o publish/tree.html

echo "==> Copying static pages into publish/..."
cp index.html publish/index.html
cp grid_viewer.html publish/grid_viewer.html
cp rarest.html publish/rarest.html
cp range_viewer.html publish/range_viewer.html

echo "==> Copying built viewer scripts into publish/..."
cp dist/range_viewer.js dist/range_viewer.js.map publish/
cp dist/rarest.js dist/rarest.js.map publish/
cp dist/grid_viewer.js dist/grid_viewer.js.map publish/
cp dist/tree_page.js dist/tree_page.js.map publish/

echo "==> Publishing..."
cd publish
if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing changed; the live site is already current."
  exit 0
fi
git add -A
git commit -m "update $(date '+%Y-%m-%d %H:%M')"
git push
echo "==> Pushed. GitHub Pages will redeploy in a moment:"
echo "    ${pages_url}"
