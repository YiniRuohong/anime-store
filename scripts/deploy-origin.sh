#!/usr/bin/env bash
set -euo pipefail

ARCHIVE="${1:-.deploy/anime-store-standalone.tgz}"
TARGET="${TARGET:-/opt/neuq-ani/laser_webpanel/deploy/sites/shop}"
SERVICE_NAME="${SERVICE_NAME:-anime-store}"
RELEASE_ID="${RELEASE_ID:-$(date +%Y%m%d%H%M%S)}"
RELEASE_DIR="$TARGET/releases/$RELEASE_ID"

mkdir -p "$RELEASE_DIR"
tar -xzf "$ARCHIVE" -C "$RELEASE_DIR"
ln -sfn "$RELEASE_DIR" "$TARGET/current"
systemctl restart "$SERVICE_NAME"
systemctl --no-pager --full status "$SERVICE_NAME"
