
## 目录结构

- `common`：通用组件
- `app`：路由组件
  - `site`：前端
  - `admin`：管理后台
  - `api`：接口
- `components`：shadcn UI
- `lib`：公共函数
- `hooks`：自定义 hooks

## 环境变量（.env.local）

```env
ADMIN_USER=admin
ADMIN_PASS=your_strong_password_here```


## 在线预览
🔗 **[在线预览](https://blog-3k6727z1u-caolei-s-projects.vercel.app/)**



# 用 Next.js 16 搭建全栈个人博客的完整技术栈与步骤


一、技术栈一览
基础框架与语言
Next.js 16 (App Router) + TypeScript

React 19 (内置于 Next.js 16)

Turbopack (默认构建工具，极速开发体验)

样式与UI
Tailwind CSS (原子化样式)

@tailwindcss/typography (文章排版美化)

shadcn/ui (后台管理组件库，基于 Radix UI)

lucide-react (图标库)

前台博客功能
@m2d/react-markdown (服务端 Markdown 渲染)

remark-gfm、rehype-highlight、rehype-slug (Markdown 插件：代码高亮、GFM、标题ID)

framer-motion (页面切换动画，左出右入效果)

后台管理
@uiw/react-md-editor (Markdown 编辑器，带实时预览)

highlight.js (代码语法高亮样式)

鉴权
HTTP Basic Auth (环境变量 + Next.js 中间件)

数据库 (可选，动态博客)
Turso (分布式 SQLite 服务)

Drizzle ORM (类型安全的数据库操作)

nanoid (生成唯一ID)

部署与域名
Vercel (免费托管平台，与 Next.js 原生集成)

自定义域名 (从 NameSilo/Cloudflare 等购买，绑定到 Vercel)

二、项目实施步骤
1. 项目初始化
bash
npx create-next-app@latest my-blog --typescript --tailwind --eslint --app --src-dir --turbopack
2. 搭建项目目录结构
采用 App Router 的路由组 (site) 将前台与后台布局分离，关键目录：

text
app/
├── (site)/           ← 前台布局（导航栏、页脚）
│   ├── page.tsx      ← 首页
│   ├── articles/[slug]/page.tsx
│   ├── misc/page.tsx
│   ├── life/page.tsx
│   └── ...
├── admin/            ← 后台独立布局
│   ├── page.tsx      ← 仪表盘
│   ├── articles/new/page.tsx
│   └── articles/[id]/page.tsx
├── api/
│   └── admin/articles/route.ts
└── layout.tsx        ← 根布局（仅 <html> + <body>）
3. 前台 Markdown 渲染 (服务端组件)
安装：

bash
npm install @m2d/react-markdown remark-gfm rehype-highlight rehype-slug
创建 components/MarkdownContent.tsx，在文章页使用 <MarkdownContent content={...} />，渲染完全在服务端完成，零客户端 JS。

4. 页面过渡动画
安装 framer-motion，创建 PageTransition 客户端组件，实现“左出右入”滑动效果。在 (site)/layout.tsx 中包裹内容。

5. 后台管理系统
执行 npx shadcn@latest init（选择 Neutral 风格、Radix UI）

添加所需组件：button、card、table、sidebar、dialog、form 等

在 admin/layout.tsx 中编写侧边栏布局

文章编辑页引入 @uiw/react-md-editor 作为 Markdown 编辑器

创建 middleware.ts 使用 Basic Auth 保护 /admin 和 /api/admin 路由

6. API 路由
在 app/api/admin/articles/route.ts 中实现 GET/POST 等接口，用于后台文章管理。初期可用写死数据，后期接入数据库。

7. 部署上线
推送代码到 GitHub

在 Vercel 导入该项目，设置环境变量 ADMIN_USER 和 ADMIN_PASS

自动获得 *.vercel.app 预览域名

购买自定义域名，在 Vercel 的 Domains 设置中添加，并按指引配置 DNS

8. 绑定数据库（可选）
创建 Turso 数据库，获取 URL 和 Token

安装 drizzle-orm 和 @libsql/client

定义 Schema（articles、tags 表）

编写查询函数，替换前端写死的数据

在 Vercel 中配置数据库环境变量，重新部署

三、关键决策总结
纯静态 vs 动态：初期可使用 Markdown 文件或写死数据快速上线，后期平滑迁移至 Turso 数据库。

后台鉴权：HTTP Basic Auth 最简单，适合单人使用；未来可升级为 NextAuth.js。

部署平台：Vercel 对 Next.js 支持最佳，免费额度足够个人博客。

域名：建议购买付费域名（年费几十元），比免费子域名更稳定、专业。

整个项目从零到上线约需 1-2 周业余时间，所有核心功能（前台展示、后台管理、鉴权、部署）均已覆盖，且技术栈现代化，易于后续扩展。
