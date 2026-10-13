// lib/db/seed.ts
// 种子数据：文章 / 标签 / 人生路 / 杂烩 / 摄影
// 可重复执行，已存在的内容自动跳过。
// 运行：npm run db:seed
import { nanoid } from 'nanoid';
import { db } from './index';
import { articles, tags, articlesToTags, life, misc, photography } from './schema';

const daysAgo = (n: number) => new Date(Date.now() - n * 86400_000).toISOString();

// ---------- 标签 ----------
const seedTags = ['前端', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', '部署', '随笔', '生活', '工具'];

// ---------- 文章 ----------
const seedArticles: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tagNames: string[];
  daysAgo: number;
}[] = [
  {
    title: 'React 19 新特性全解析',
    slug: 'react-19-features',
    excerpt: 'Actions、useOptimistic、use()、Server Components——React 19 最值得关注的更新一次讲清。',
    tagNames: ['React', '前端'],
    daysAgo: 62,
    content: `# React 19 新特性全解析

React 19 已经随 Next.js 16 成为默认版本。这篇文章梳理一下日常开发中最常用到的新能力。

## 1. Actions：把异步操作变成一等公民

以前提交表单要手写 \`useState\` 管理 loading 和 error，现在用 \`useActionState\` 一把梭：

\`\`\`tsx
const [error, submitAction, isPending] = useActionState(
  async (prevState, formData) => {
    const error = await updateUser(formData);
    if (error) return error;
    redirect('/profile');
  },
  null,
);

<form action={submitAction}>
  <input type="text" name="name" />
  <button disabled={isPending}>{isPending ? '提交中...' : '提交'}</button>
  {error && <p>{error}</p>}
</form>
\`\`\`

## 2. useOptimistic：乐观更新

先渲染预期结果，等服务器响应后再修正，列表点赞、已读状态这类场景体验提升明显：

\`\`\`tsx
const [optimisticLikes, addLike] = useOptimistic(
  likes,
  (current) => current + 1,
);
\`\`\`

## 3. use()：在组件里直接读 Promise

\`use()\` 可以在条件语句中调用，比 Hooks 规则更灵活：

\`\`\`tsx
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((c) => <p key={c.id}>{c.text}</p>);
}
\`\`\`

## 4. Server Components

在服务端完成数据获取和渲染，客户端只收到最终的 HTML，首屏更快、JS 更小。配合 Next.js App Router 使用最佳。

## 小结

| 特性 | 解决的痛点 |
| --- | --- |
| Actions | 表单异步逻辑样板代码 |
| useOptimistic | 乐观更新手写回滚 |
| use() | Promise 读取更灵活 |
| Server Components | 客户端 JS 体积过大 |

不必急着全量升级，但新项目可以直接享受这些能力。
`,
  },
  {
    title: 'TypeScript 类型体操：五个实用技巧',
    slug: 'typescript-type-tips',
    excerpt: '不写花里胡哨的类型杂技，只挑项目里真正每天都在用的五个技巧。',
    tagNames: ['TypeScript'],
    daysAgo: 48,
    content: `# TypeScript 类型体操：五个实用技巧

类型体操的名声不太好，好像只是为了炫技。其实有几个技巧是每天写业务都能省时间的。

## 1. satisfies：保留字面量类型

\`\`\`ts
const config = {
  mode: 'development',
  port: 3000,
} satisfies Record<string, string | number>;

config.mode; // 类型是 'development' 而不是 string
\`\`\`

## 2. 从值推导类型

\`\`\`ts
const roles = ['admin', 'editor', 'viewer'] as const;
type Role = (typeof roles)[number]; // 'admin' | 'editor' | 'viewer'
\`\`\`

## 3. 函数的返回值推导

\`\`\`ts
async function getUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}
type User = Awaited<ReturnType<typeof getUser>>;
\`\`\`

## 4. 模板字面量类型做路由参数

\`\`\`ts
type Route = \`/articles/\${string}\` | \`/life/\${string}\`;
function navigate(path: Route) { /* ... */ }
\`\`\`

## 5. 精确的可选属性

\`\`\`ts
interface Props {
  name?: string;
}
// 避免 { name: undefined } 这种传参
\`\`\`

## 结语

类型是为业务服务的。先让编译器替你记住约定，再考虑更高级的技巧。
`,
  },
  {
    title: 'Tailwind CSS v4 升级小记',
    slug: 'tailwind-v4-guide',
    excerpt: '零配置、CSS 优先、@vite 插件——Tailwind v4 让样式方案又轻了一圈。',
    tagNames: ['前端', '工具'],
    daysAgo: 35,
    content: `# Tailwind CSS v4 升级小记

博客升级到 Tailwind v4 用了一下午，整体体验很顺，记录一下关键点。

## 最大的变化：CSS 优先配置

不再需要 \`tailwind.config.js\`，直接在 CSS 里用 \`@theme\`：

\`\`\`css
@import "tailwindcss";

@theme {
  --color-brand: #53ade5;
  --font-sans: "Inter", sans-serif;
}
\`\`\`

## 更智能的内容检测

v4 自动扫描项目文件，\`content\` 配置整个删掉了。

## 性能提升

新的 Oxide 引擎构建速度快了数倍，热更新几乎无感。

## 升级步骤

1. 升级 \`tailwindcss\` 和 \`@tailwindcss/postcss\`
2. \`globals.css\` 里把三行指令换成 \`@import "tailwindcss";\`
3. 把 config 里的主题迁移到 \`@theme\`
4. 跑一遍构建，按报错逐个修

## 踩到的一个小坑

\`prose\` 排版插件要装 \`@tailwindcss/typography\` 的 v4 兼容版，否则文章页样式全丢——别问我是怎么知道的。

总体值得升级，新项目直接用 v4 就好。
`,
  },
  {
    title: '用 Drizzle ORM + Turso 给博客加数据库',
    slug: 'drizzle-turso-blog',
    excerpt: '从写死数据到完整 CRUD：Drizzle 的类型安全 + Turso 的免费额度，个人博客的绝配。',
    tagNames: ['Next.js', '工具'],
    daysAgo: 21,
    content: `# 用 Drizzle ORM + Turso 给博客加数据库

博客第一版的文章是写死在代码里的。这篇文章记录接入 Drizzle + Turso 的完整过程。

## 为什么是 Drizzle + Turso

- **Drizzle**：SQL 风格的类型安全 ORM，schema 就是 TypeScript 类型
- **Turso**：基于 libSQL 的分布式 SQLite，免费额度对个人博客绰绰有余

## 定义 Schema

\`\`\`ts
// lib/db/schema.ts
export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
});
\`\`\`

## 类型安全的查询

\`\`\`ts
const posts = await db.query.articles.findMany({
  where: eq(articles.published, true),
  orderBy: desc(articles.createdAt),
});
\`\`\`

## 同步与迁移

\`\`\`bash
npm run db:push   # schema 变更推送到 Turso
npm run db:seed   # 灌入种子数据
\`\`\`

## 连接生产环境

Vercel 里配置 \`TURSO_DATABASE_URL\` 和 \`TURSO_AUTH_TOKEN\` 两个环境变量即可，代码零改动。

## 总结

从"写死数据"到"后台可视化管理"，改动量比想象小很多。类型安全让重构心里有底，值得。
`,
  },
  {
    title: 'Next.js 16 自建服务器部署指南',
    slug: 'nextjs-self-host-deploy',
    excerpt: 'Vercel 之外的另一种选择：standalone 输出 + systemd + Nginx，一台便宜 VPS 就够了。',
    tagNames: ['Next.js', '部署'],
    daysAgo: 9,
    content: `# Next.js 16 自建服务器部署指南

博客除了 Vercel，也部署在自己的 VPS 上。这套流程已经稳定跑了很久，分享出来。

## 1. 开启 standalone 输出

\`\`\`js
// next.config.ts
const nextConfig = {
  output: 'standalone',
};
\`\`\`

构建产物会包含一个自包含的 \`server.js\`，不需要安装完整 node_modules。

## 2. systemd 守护进程

\`\`\`ini
# /etc/systemd/system/blog.service
[Unit]
Description=Blog
After=network.target

[Service]
WorkingDirectory=/opt/blog
ExecStart=/usr/bin/node .next/standalone/server.js
Restart=always
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
systemctl enable blog
systemctl start blog
\`\`\`

## 3. Nginx 反向代理

\`\`\`nginx
server {
    listen 80;
    server_name blog.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

别忘了用 certbot 签一个免费 HTTPS 证书。

## 4. CI/CD 一键部署

GitCode CI 监听 main 分支推送，构建后 rsync 到服务器并重启服务，失败自动回滚。流水线脚本在仓库 \`scripts/deploy\` 目录。

## 成本

一台入门 VPS + 免费证书，一年几百块，顺便还能跑其他小项目。对个人博客来说绰绰有余。
`,
  },
];

// ---------- 人生路 ----------
const seedLife: {
  title: string;
  excerpt: string;
  content: string;
  cover?: string;
  daysAgo: number;
}[] = [
  {
    title: '周末去爬山了',
    excerpt: '久违地放下键盘，用一整天的时间和一座山相处。',
    cover: '/img/r1.jpg',
    daysAgo: 26,
    content: `# 周末去爬山了

连续写了两周代码，周末决定出去走走。

## 山里的节奏

没有消息通知，没有构建报错。只有台阶、风声，和自己有点喘的呼吸。

走到半山腰的时候 fog 漫上来，整个山谷像被按了降噪键。

## 一些照片

带了相机，按了几张。好看的已经放到「摄影」栏目了。

## 回程的路上想明白的一件事

代码里的很多问题，其实和身体一样——不是解决了才轻松，是先停下来，才看得见答案。

下周继续写那个拖了很久的重构。
`,
  },
  {
    title: '深夜的咖啡与代码',
    excerpt: '凌晨一点的台灯下，咖啡凉了一半，bug 也终于有了眉目。',
    cover: '/img/coffee.png',
    daysAgo: 14,
    content: `# 深夜的咖啡与代码

人总说熬夜写代码不健康，但偶尔一次"无人打扰的深夜"，效率确实高得惊人。

## 今晚的战场

给博客后台加媒体库。看似简单的一个复制链接功能，真正写起来要考虑：

- 剪贴板 API 的权限问题
- http 图片与本地图片的混排
- 空状态的提示文案

## 一个小发现

\`navigator.clipboard.writeText\` 在非 HTTPS 环境会直接抛异常，降级方案还是要留的：

\`\`\`ts
try {
  await navigator.clipboard.writeText(url);
} catch {
  // textarea + execCommand('copy') 兜底
}
\`\`\`

## 收尾

咖啡凉了，功能好了。睡觉，明天再看一遍——深夜的代码，白天总要重新认识自己。
`,
  },
  {
    title: '家里来了只猫',
    excerpt: '一只橘色的流浪猫正式入住，从此键盘上多了一个监工。',
    cover: '/img/r2.jpg',
    daysAgo: 5,
    content: `# 家里来了只猫

上个月在楼下喂了三次，这个月它就拖家带口地住进来了。

## 相处第一周

- 第一天：躲在床底，只出来吃猫粮
- 第三天：开始视察房间，重点检查我的键盘
- 第七天：已经会在写代码时趴在显示器后面监工

## 它教会我的事

写代码和养猫一样——你以为是你在安排它，其实是它在容忍你。

## 起名

暂定叫"Merge"，因为它总喜欢在我提交代码的时候跳上桌子。

说不定以后博客里会有它的专栏。
`,
  },
];

// ---------- 杂烩 ----------
const seedMisc: {
  title: string;
  excerpt: string;
  content: string;
  cover?: string;
  daysAgo: number;
}[] = [
  {
    title: '我的 2026 桌面与工具清单',
    excerpt: '工欲善其事：编辑器、终端、效率工具，一次盘点。',
    cover: '/img/head.jpg',
    daysAgo: 30,
    content: `# 我的 2026 桌面与工具清单

年底盘点一下自己每天真正在用的工具。

## 开发环境

| 工具 | 用途 |
| --- | --- |
| VS Code | 主力编辑器，插件越少越稳 |
| Windows Terminal + Git Bash | 终端 |
| Chrome DevTools | 调试一条龙 |

## 效率工具

- **Obsidian**：本地优先的笔记，Markdown 永不过时
- **Snipaste**：截图 + 贴图，写文档神器
- **Everything**：秒搜文件

## 心得

工具贵精不贵多。一个工具用顺手，胜过十个装在硬盘里吃灰。
`,
  },
  {
    title: '读书笔记：《人类简史》',
    excerpt: '认知革命、农业革命、科学革命——换个尺度看人类文明。',
    daysAgo: 17,
    content: `# 读书笔记：《人类简史》

用了三周读完，记录几句印象深刻的话。

## 认知革命

智人脱颖而出的关键，是**虚构故事的能力**。国家、货币、公司，本质上都是集体想象。只要所有人都相信，虚构的东西就有了改造现实的力量。

## 农业革命

"人类以为自己驯化了植物，其实是植物驯化了人类。"

从采集到农耕，人均生活质量其实是下降的，但人口和秩序让这条路无法回头。

## 科学革命

承认"无知"是现代科学的起点。地图上留白的地方，才是探险的方向。

## 一句话总结

**我们并没有驯化世界，只是学会了和它一起讲故事。**
`,
  },
  {
    title: '深夜食堂：一碗葱油拌面',
    excerpt: '十分钟就能完成的神仙夜宵，附完整做法。',
    daysAgo: 3,
    content: `# 深夜食堂：一碗葱油拌面

写代码写到半夜，冰箱里只剩一把小葱和一个洋葱。够了。

## 材料

- 小葱一把
- 洋葱半个
- 面条一把
- 生抽 2 勺、老抽 1 勺、糖半勺

## 做法

1. 小葱切段，洋葱切丝，冷油下锅
2. 小火慢炸到焦黄，捞出葱渣
3. 油温降下来后倒入调好的酱汁，冒泡即可
4. 煮面，过凉水，浇葱油，拌匀

## 关键

葱要炸到"快糊没糊"的边缘，那是香味最盛的时候——和写代码一样，火候就是分寸。

吃完这碗，今晚的 bug 都不算什么了。
`,
  },
];

// ---------- 摄影 ----------
const seedPhotography: {
  title: string;
  description: string;
  imageUrl: string;
  daysAgo: number;
}[] = [
  { title: '山间的雾', description: '爬到半山腰时，雾漫上来了', imageUrl: 'https://picsum.photos/seed/mountain-fog/800/600', daysAgo: 26 },
  { title: '窗边的光', description: '下午三点的阳光正好', imageUrl: 'https://picsum.photos/seed/window-light/800/600', daysAgo: 22 },
  { title: '街角', description: '下班路上随手一拍', imageUrl: 'https://picsum.photos/seed/street-corner/800/600', daysAgo: 18 },
  { title: '海的呼吸', description: '假期在海边住了一晚', imageUrl: 'https://picsum.photos/seed/sea-breath/800/600', daysAgo: 12 },
  { title: '猫与键盘', description: 'Merge 的日常监工', imageUrl: 'https://picsum.photos/seed/cat-keyboard/800/600', daysAgo: 5 },
  { title: '夜跑路上', description: '路灯连成一条线', imageUrl: 'https://picsum.photos/seed/night-run/800/600', daysAgo: 1 },
];

async function seed() {
  // 1. 标签（按名称去重）
  const existingTags = await db.select().from(tags);
  const tagIdByName = new Map(existingTags.map((t) => [t.name, t.id]));
  for (const name of seedTags) {
    if (!tagIdByName.has(name)) {
      const id = nanoid();
      await db.insert(tags).values({ id, name });
      tagIdByName.set(name, id);
      console.log(`+ 标签: ${name}`);
    }
  }

  // 2. 文章（按 slug 去重）
  const existingSlugs = new Set(
    (await db.select({ slug: articles.slug }).from(articles)).map((a) => a.slug),
  );
  for (const item of seedArticles) {
    if (existingSlugs.has(item.slug)) continue;
    const id = nanoid();
    const now = daysAgo(item.daysAgo);
    await db.insert(articles).values({
      id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      excerpt: item.excerpt,
      published: true,
      createdAt: now,
      updatedAt: now,
    });
    const relations = item.tagNames
      .map((name) => tagIdByName.get(name))
      .filter((tagId): tagId is string => Boolean(tagId))
      .map((tagId) => ({ articleId: id, tagId }));
    if (relations.length) {
      await db.insert(articlesToTags).values(relations);
    }
    console.log(`+ 文章: ${item.title}`);
  }

  // 3. 人生路（按标题去重）
  const existingLifeTitles = new Set(
    (await db.select({ title: life.title }).from(life)).map((l) => l.title),
  );
  for (const item of seedLife) {
    if (existingLifeTitles.has(item.title)) continue;
    const now = daysAgo(item.daysAgo);
    await db.insert(life).values({
      id: nanoid(),
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      cover: item.cover ?? null,
      published: true,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`+ 人生路: ${item.title}`);
  }

  // 4. 杂烩（按标题去重）
  const existingMiscTitles = new Set(
    (await db.select({ title: misc.title }).from(misc)).map((m) => m.title),
  );
  for (const item of seedMisc) {
    if (existingMiscTitles.has(item.title)) continue;
    const now = daysAgo(item.daysAgo);
    await db.insert(misc).values({
      id: nanoid(),
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      cover: item.cover ?? null,
      published: true,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`+ 杂烩: ${item.title}`);
  }

  // 5. 摄影（按图片地址去重）
  const existingPhotoUrls = new Set(
    (await db.select({ imageUrl: photography.imageUrl }).from(photography)).map((p) => p.imageUrl),
  );
  for (const item of seedPhotography) {
    if (existingPhotoUrls.has(item.imageUrl)) continue;
    await db.insert(photography).values({
      id: nanoid(),
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      published: true,
      createdAt: daysAgo(item.daysAgo),
    });
    console.log(`+ 摄影: ${item.title}`);
  }

  console.log('✅ Seed 完成（已存在的内容已跳过）');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
