#!/usr/bin/env bash
set -euo pipefail

TARGET="${TARGET:-/opt/neuq-ani/laser_webpanel/deploy/sites/shop}"
SERVICE_NAME="${SERVICE_NAME:-anime-store}"
NGINX_CONF="${NGINX_CONF:-/etc/nginx/conf.d/shop.neuq-ani.me.conf}"

mkdir -p "$TARGET/releases"
if [ ! -f "$TARGET/.env.production" ]; then
  cat > "$TARGET/.env.production" <<'ENV'
DATABASE_URL="postgresql://anime_store:change-me@localhost:5432/anime_store?schema=public"
ADMIN_PASSWORD_HASH=""
AUTH_SECRET=""
ALIPAY_QR_URL=""
NEXT_PUBLIC_SITE_URL="https://shop.neuq-ani.me"
ENV
  chmod 600 "$TARGET/.env.production"
fi

cp deploy/systemd/anime-store.service "/etc/systemd/system/${SERVICE_NAME}.service"
if command -v nginx >/dev/null 2>&1; then
  cp deploy/nginx/shop.neuq-ani.me.conf "$NGINX_CONF"
  nginx -t
  systemctl reload nginx
elif command -v openresty >/dev/null 2>&1; then
  cp deploy/nginx/shop.neuq-ani.me.conf "$NGINX_CONF"
  openresty -t
  systemctl reload openresty
fi

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
echo "Bootstrap complete. Edit $TARGET/.env.production before first restart."
