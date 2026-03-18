#!/usr/bin/env bash
set -euo pipefail

echo "==> Building Jekyll site..."
bundle exec jekyll build

echo "==> Pushing source to GitHub (github-pages will auto-build)..."
git push github main

echo "==> Extracting _site/ and pushing to cPanel..."
git push origin $(git subtree split --prefix _site main):main --force

echo "==> Done!"
