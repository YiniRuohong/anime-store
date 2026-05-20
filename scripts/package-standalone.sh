#!/usr/bin/env bash
set -euo pipefail

rm -rf .deploy
mkdir -p .next/standalone/.next .deploy
cp -R .next/static .next/standalone/.next/static
if [ -d public ]; then
  cp -R public .next/standalone/public
fi
cp -R prisma .next/standalone/prisma
tar -C .next/standalone -czf .deploy/anime-store-standalone.tgz .
