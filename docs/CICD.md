# CI/CD 使用说明

代码托管在 GitCode，使用 GitCode CI（AtomGit Action）完成「Lint + 构建 + SSH 部署」全流程。

流水线文件：[.gitcode/workflows/ci-cd.yml](../.gitcode/workflows/ci-cd.yml)

## 流水线行为

| 触发方式 | 行为 |
| --- | --- |
| push 到任意分支 | ESLint 检查 + Next.js 构建（验证代码可发布，不部署） |
| PR 到 `main` | 同上（合并前质量检查） |
| push 到 `main` | 构建成功后**自动部署**到生产服务器 |
| 手动触发（流水线页面「运行」） | 构建，`deploy` 输入填 `true` 才部署 |

部署流程：构建 standalone 产物 → 打包上传到服务器 `releases/<commit-sha>/` → 原子切换 `current` 软链 → `systemctl restart` → 健康检查 → **失败自动回滚到上一版本** → 清理旧版本（默认保留 5 个）。

## 一、配置 GitCode Secrets（必做）

进入仓库 **设置 → Action 秘钥与变量 → 秘钥**，创建以下密钥：

| 密钥名 | 说明 | 示例 |
| --- | --- | --- |
| `TURSO_DATABASE_URL` | 数据库地址（构建期 article 页面可能读库） | `libsql://xxx.turso.io` |
| `TURSO_AUTH_TOKEN` | 数据库令牌 | — |
| `ADMIN_USER` | 管理端账号 | — |
| `ADMIN_PASS` | 管理端密码 | — |
| `DEPLOY_HOST` | 生产服务器 IP / 域名 | `1.2.3.4` |
| `DEPLOY_PORT` | SSH 端口（可选，默认 22） | `22` |
| `DEPLOY_USER` | SSH 登录用户 | `blog` |
| `DEPLOY_SSH_KEY` | SSH **私钥**（见下文生成方式） | — |
| `DEPLOY_PATH` | 服务器部署根目录 | `/opt/blog` |

可选变量（在 **变量** 页配置，非敏感）：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `DEPLOY_SERVICE_NAME` | systemd 服务名 | `blog` |
| `HEALTH_CHECK_URL` | 服务器本机健康检查地址 | `http://127.0.0.1:3000` |
| `PUBLIC_HEALTH_CHECK_URL` | 部署后从 CI  runner 验证的公网地址（不配置则复用 HEALTH_CHECK_URL） | — |

> 注意：`secrets` 在日志中自动脱敏，但请勿在脚本里 `echo "${{ secrets.XXX }}"`（可能绕过脱敏）。

### 生成部署专用 SSH 密钥

在本地执行（不要设置密钥密码）：

```bash
ssh-keygen -t ed25519 -f ~/.ssh/gitcode_deploy -C "gitcode-cd-deploy" -N ""
cat ~/.ssh/gitcode_deploy      # 私钥内容 → 粘贴到 secrets.DEPLOY_SSH_KEY
cat ~/.ssh/gitcode_deploy.pub  # 公钥 → 追加到服务器 $DEPLOY_USER 的 ~/.ssh/authorized_keys
```

## 二、服务器一次性配置（必做）

以下操作在目标服务器上以 root（或有权限的用户）执行。示例部署根目录为 `/opt/blog`。

### 1. 目录结构

```bash
sudo mkdir -p /opt/blog/releases /opt/blog/shared /var/log/blog
sudo chown -R blog:blog /opt/blog /var/log/blog   # blog 换成 DEPLOY_USER
```

### 2. 运行时环境变量

创建 `/opt/blog/shared/blog.env`（权限 600），内容参考 `.env.local`：

```bash
sudo -u blog tee /opt/blog/shared/blog.env >/dev/null <<'EOF'
TURSO_DATABASE_URL=libsql://xxx.turso.io
TURSO_AUTH_TOKEN=xxx
ADMIN_USER=admin
ADMIN_PASS=请改成强密码
PORT=3000
EOF
sudo chmod 600 /opt/blog/shared/blog.env
```

> 该文件只在服务器上维护，不进 Git。改配置后 `sudo systemctl restart blog` 生效。

### 3. systemd 服务

```bash
sudo cp scripts/deploy/blog.service.example /etc/systemd/system/blog.service
# 按实际环境修改 User/Group/路径/node 路径后：
sudo systemctl daemon-reload
sudo systemctl enable blog
```

### 4. 部署用户的 sudo 权限

部署脚本需要免密执行 `systemctl restart`：

```bash
sudo tee /etc/sudoers.d/blog-deploy >/dev/null <<'EOF'
blog ALL=(ALL) NOPASSWD: /bin/systemctl restart blog, /bin/systemctl status blog
EOF
sudo chmod 440 /etc/sudoers.d/blog-deploy
```

（`blog` 换成 `DEPLOY_USER`，`blog.service` 换成实际服务名。）

### 5. 依赖工具

部署脚本用到 `curl`、`tar`、`systemd`，一般系统自带。确认：

```bash
command -v curl tar systemctl
```

## 三、首次部署验证

1. 把本仓库 push 到 GitCode：`git push gitcode main`
2. 在仓库「流水线 / Actions」页查看运行状态
3. 首次部署后确认：`systemctl status blog`、`curl -I http://127.0.0.1:3000`

## 常见问题

- **PR 的构建失败提示数据库连不上**：Fork 的 PR 拿不到 secrets。个人仓库一般无此问题；如需要，可在 workflow 中为 `pull_request` 事件单独降级处理。
- **部署后健康检查失败但站点实际正常**：检查 `HEALTH_CHECK_URL` 是否与服务的 `PORT` 一致，防火墙是否放行。
- **回滚**：脚本在健康检查失败时自动回滚软链并重启。手动回滚：登录服务器把 `current` 指向上一个 `releases/` 目录后 `sudo systemctl restart blog`。
- **修改 Node 版本**：改 workflow 里的 `env.NODE_VERSION`（与本地 `node -v` 保持一致为宜）。
