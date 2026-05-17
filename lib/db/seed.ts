// lib/db/seed.ts
import { nanoid } from 'nanoid';
import type { InferInsertModel } from 'drizzle-orm';
import { db } from './index';             // 你的数据库连接
import { articles, tags, articlesToTags } from './schema';
// npx dotenv -e .env.local -- npx tsx lib/db/seed.ts

// 由 schema 自动推导的插入类型
type NewArticle = InferInsertModel<typeof articles>;
type NewTag = InferInsertModel<typeof tags>;
type NewArticleToTag = InferInsertModel<typeof articlesToTags>;

async function seed() {
    // 1. 创建标签（可选）
    const tag1Id = nanoid();
    const tag2Id = nanoid();
    await db.insert(tags).values([
        { id: tag1Id, name: 'Next.js' },
        { id: tag2Id, name: '前端' },
    ]);

    // 2. 创建文章
    const article1 = {
        id: nanoid(),
        title: '你好，世界',
        slug: 'hello-world',
        content: `# 你好，世界\n\n这是我的第一篇文章。\n\n## 代码块\n\`\`\`ts\nconsole.log("Hello World");\n\`\`\`\n\n## 列表\n- 第一项\n- 第二项`,
        excerpt: '这是我的第一篇文章，欢迎阅读。',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const article2 = {
        id: nanoid(),
        title: 'Next.js 16 学习笔记',
        slug: 'nextjs-16-notes',
        content: `# Next.js 16 新特性\n\n## Turbopack 正式版\n\n构建速度提升 2-5 倍。\n\n## React 19 支持\n\n内置了 React Compiler。`,
        excerpt: '探索 Next.js 16 的核心更新与最佳实践。',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    await db.insert(articles).values([article1, article2]);

    // 3. 关联文章与标签（可选）
    const articleTagRelations: NewArticleToTag[] = [
        { articleId: article1.id, tagId: tag1Id },
        { articleId: article2.id, tagId: tag1Id },
        { articleId: article2.id, tagId: tag2Id },
    ];
    await db.insert(articlesToTags).values(articleTagRelations);

    console.log('✅ Seed data inserted successfully!');
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});