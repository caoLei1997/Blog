// scripts/import-article.ts
// 从 Markdown 文件导入文章到数据库
// 用法：npx dotenv -e .env.local -- npx tsx scripts/import-article.ts <文件路径> [标签1,标签2] [slug]
// 示例：npx dotenv -e .env.local -- npx tsx scripts/import-article.ts ./初识函数式编程.md "前端,函数式编程" fp-intro
import { readFileSync } from 'node:fs';
import { db } from '../lib/db/index';
import { articles, tags, articlesToTags } from '../lib/db/schema';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

const filePath = process.argv[2];
const tagNames = (process.argv[3] || '').split(',').map((s) => s.trim()).filter(Boolean);
const customSlug = process.argv[4]?.trim();

if (!filePath) {
  console.error('请提供 Markdown 文件路径');
  process.exit(1);
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  const raw = readFileSync(filePath, 'utf-8');
  // 第一行 # 标题作为文章标题
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '未命名文章';
  const slug = customSlug || toSlug(title) || nanoid(8);

  const existing = await db.query.articles.findFirst({ where: eq(articles.slug, slug) });
  if (existing) {
    console.error(`已存在 slug 为「${slug}」的文章，请先处理重复`);
    process.exit(1);
  }

  const now = new Date().toISOString();
  const articleId = nanoid();
  await db.insert(articles).values({
    id: articleId,
    title,
    slug,
    content: raw,
    excerpt: raw.replace(/^#.*$/gm, '').replace(/[#*\`\-\>\[\]\(\)]/g, '').trim().slice(0, 120),
    published: true,
    createdAt: now,
    updatedAt: now,
  });

  for (const name of tagNames) {
    let tag = await db.query.tags.findFirst({ where: eq(tags.name, name) });
    if (!tag) {
      const id = nanoid();
      await db.insert(tags).values({ id, name });
      tag = { id, name };
    }
    await db.insert(articlesToTags).values({ articleId, tagId: tag.id });
  }

  console.log(`✅ 已导入文章「${title}」，slug: ${slug}，标签: ${tagNames.join(', ') || '无'}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ 导入失败:', err);
  process.exit(1);
});
