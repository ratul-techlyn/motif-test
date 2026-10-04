#!/bin/bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
# 🔧 CONFIGURATION
NEXT_SRC="./"
NEXT_DEST="root@193.203.167.213:/home/motifadmin/htdocs/wemotif.com/"
WP_PATH="/home/motifadmin/htdocs/childs"
REMOTE_HOST="root@193.203.167.213"
PORT=3333

# ─────────────────────────────────────────────────────────────
# 📦 SYNC NEXT.JS FILES (PROTECT WORDPRESS)
rsync -az --delete \
  --filter='protect childs/' --filter='protect childs/**' \
  --exclude='.env*' --exclude='.next/' --exclude='node_modules/' \
  --exclude='.git/' --exclude='.github/' \
  "$NEXT_SRC" "$NEXT_DEST"

# ─────────────────────────────────────────────────────────────
# 🚀 REMOTE BUILD + DEPLOY
ssh "$REMOTE_HOST" bash -s <<EOF
SITE="/home/motifadmin/htdocs/wemotif.com"
WP="/home/motifadmin/htdocs/childs"
PORT=$PORT

echo "🧨 Killing rogue processes on port \$PORT..."
PID=\$(ss -tulnp | grep ":\$PORT" | awk '{print \$NF}' | cut -d',' -f2 | cut -d= -f2)
[ -n "\$PID" ] && kill -9 "\$PID" && echo "✅ Port \$PORT freed" || echo "✅ No rogue process found"

echo "🧼 Cleaning old Next.js build artifacts..."
rm -rf "\$SITE/.next" "\$SITE/.turbo" "\$SITE/node_modules"

echo "🔐 Fixing ownership (excluding WordPress)..."
find "\$SITE" -path "\$WP" -prune -o -exec chown -h motifadmin:motifadmin {} +

echo "🔍 Auditing WordPress permissions..."
chown -R www-data:www-data "\$WP"
find "\$WP" -type d -exec chmod 755 {} \;
find "\$WP" -type f -exec chmod 644 {} \;

echo "📦 Installing dependencies..."
export NVM_DIR=/home/motifadmin/.nvm
[ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
nvm use v22 >/dev/null

cd "\$SITE"

# ─────────────────────────────────────────────────────────────
# 🔐 Ensure persistent .env.production symlink
ENV_SOURCE="/home/motifadmin/envs/wemotif.env"
ENV_TARGET="\$SITE/.env.production"

echo "🔐 Checking for persistent .env symlink..."
if [ ! -f "\$ENV_SOURCE" ]; then
  echo "❌ Env file missing at \$ENV_SOURCE. Aborting."
  exit 1
fi

if [ ! -L "\$ENV_TARGET" ]; then
  ln -s "\$ENV_SOURCE" "\$ENV_TARGET"
  echo "✅ Symlinked .env.production"
else
  echo "✅ .env.production symlink already exists"
fi

chmod 600 "\$ENV_SOURCE"
chown motifadmin:www-data "\$ENV_SOURCE"

# ─────────────────────────────────────────────────────────────
# 🔨 Building Next.js app
if [ -f pnpm-lock.yaml ]; then
  corepack enable || true
  pnpm install --frozen-lockfile
elif [ -f yarn.lock ]; then
  corepack enable || true
  yarn install --frozen-lockfile
elif [ -f package-lock.json ]; then
  npm ci
elif [ -f package.json ]; then
  npm install
else
  echo "❌ No package.json found. Aborting."
  exit 1
fi

echo "🔨 Building Next.js app..."
npm run build

echo "🚀 Starting PM2 on port \$PORT..."
pm2 reload wemotif-com || pm2 start npm --name wemotif-com -- start -- -p \$PORT
pm2 save

echo "✅ Deployment complete."

# ─────────────────────────────────────────────────────────────
# 🧪 POST-DEPLOY HEALTH CHECKS
echo "🧪 Running health checks..."

# Next.js health check
if curl -sI http://127.0.0.1:\$PORT | grep -q "HTTP/1.1 200"; then
  echo "✅ Next.js is responding"
else
  echo "❌ Next.js not responding"
fi

# WordPress health check
if curl -sI http://127.0.0.1/childs | grep -q "HTTP/1.1 200"; then
  echo "✅ WordPress is responding"
else
  echo "❌ WordPress not responding"
fi

# PHP-FPM socket check
[ -S /run/php/php8.2-fpm-wemotif.sock ] && echo "✅ PHP-FPM socket exists" || echo "❌ PHP-FPM socket missing"

# NGINX config check
nginx -t && echo "✅ NGINX config is valid" || echo "❌ NGINX config has errors"

echo "🔧 Restoring WordPress directory permissions..."
chmod -R 777 "\$WP"
chown -R www-data:www-data "\$WP"
EOF
