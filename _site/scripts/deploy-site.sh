#!/usr/bin/env bash
set -euo pipefail

echo "==> Building Jekyll site..."
bundle exec jekyll build

echo "==> Pushing source to GitHub (cPanel will auto-build and deploy)..."
git push origin master

echo "==> Done!"
