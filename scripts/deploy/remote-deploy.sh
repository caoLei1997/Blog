#!/usr/bin/env bash
# 远程部署脚本：在目标服务器上执行
# 通过 SSH 调用：ssh user@host 'bash -s' < remote-deploy.sh
# 依赖环境变量：DEPLOY_PATH、RELEASE_SHA（由流水线注入）
# 可选环境变量：SERVICE_NAME（默认 blog）、KEEP_RELEASES（默认 5）、
#               HEALTH_CHECK_URL（默认 http://127.0.0.1:3000）、HEALTH_CHECK_RETRIES（默认 30）
set -euo pipefail

DEPLOY_PATH="${DEPLOY_PATH:?请设置 DEPLOY_PATH（如 /opt/blog）}"
RELEASE_SHA="${RELEASE_SHA:?请设置 RELEASE_SHA}"
SERVICE_NAME="${SERVICE_NAME:-blog}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
HEALTH_CHECK_URL="${HEALTH_CHECK_URL:-http://127.0.0.1:3000}"
HEALTH_CHECK_RETRIES="${HEALTH_CHECK_RETRIES:-30}"

RELEASES_DIR="$DEPLOY_PATH/releases"
CURRENT_LINK="$DEPLOY_PATH/current"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_SHA"

log() { echo "==> $*"; }

# ---------- 解压新版本 ----------
log "解压产物 $RELEASE_SHA"
mkdir -p "$RELEASES_DIR"
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"
tar -xzf "$RELEASES_DIR/$RELEASE_SHA.tar.gz" -C "$RELEASE_DIR"
rm -f "$RELEASES_DIR/$RELEASE_SHA.tar.gz"

PREVIOUS=""
if [ -L "$CURRENT_LINK" ]; then
  PREVIOUS="$(readlink -f "$CURRENT_LINK")"
fi

# ---------- 原子切换软链接 ----------
log "切换 current -> $RELEASE_DIR"
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK.tmp.$$"
mv -Tf "$CURRENT_LINK.tmp.$$" "$CURRENT_LINK"

# ---------- 重启服务 ----------
log "重启服务 $SERVICE_NAME"
sudo systemctl restart "$SERVICE_NAME"

# ---------- 健康检查（失败自动回滚） ----------
log "健康检查 $HEALTH_CHECK_URL"
ok=""
for _ in $(seq 1 "$HEALTH_CHECK_RETRIES"); do
  if curl -fsS -o /dev/null --max-time 5 "$HEALTH_CHECK_URL"; then
    ok=1
    break
  fi
  sleep 2
done

if [ -z "$ok" ]; then
  echo "!! 健康检查失败，回滚到上一个版本: ${PREVIOUS:-无（无法回滚）}"
  if [ -n "$PREVIOUS" ] && [ -d "$PREVIOUS" ]; then
    ln -sfn "$PREVIOUS" "$CURRENT_LINK.tmp.$$"
    mv -Tf "$CURRENT_LINK.tmp.$$" "$CURRENT_LINK"
    sudo systemctl restart "$SERVICE_NAME"
    echo "!! 已回滚并重启，请人工排查新版本问题"
  fi
  exit 1
fi

# ---------- 清理旧版本 ----------
log "清理旧版本（保留最近 $KEEP_RELEASES 个）"
cd "$RELEASES_DIR"
# shellcheck disable=SC2012
ls -1t | tail -n +"$((KEEP_RELEASES + 1))" | xargs -r rm -rf

log "部署完成：$RELEASE_SHA"
