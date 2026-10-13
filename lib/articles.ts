import { nanoid } from 'nanoid';
import { eq, desc, and, inArray, sql } from 'drizzle-orm';
import { db } from './db/index';
import { articles, tags, articlesToTags } from './db/schema';

// ---------- 查询 ----------

export async function getArticles(tagId?: string) {
  // 按标签筛选：通过关联表过滤；列表统一带上文章自身的标签
  const withTags = {
    articleTags: {
      with: { tag: true },
    },
  } as const;

  if (tagId) {
    const articleIds = db
      .select({ id: articlesToTags.articleId })
      .from(articlesToTags)
      .where(eq(articlesToTags.tagId, tagId));
    return db.query.articles.findMany({
      where: and(eq(articles.published, true), inArray(articles.id, articleIds)),
      orderBy: desc(articles.createdAt),
      with: withTags,
    });
  }
  return db.query.articles.findMany({
    where: eq(articles.published, true),
    orderBy: desc(articles.createdAt),
    with: withTags,
  });
}

export async function getArticleById(slug: string) {
  return db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });
}

// 前台详情页使用：带上标签
export async function getArticleBySlugWithTags(slug: string) {
  return db.query.articles.findFirst({
    where: eq(articles.slug, slug),
    with: {
      articleTags: {
        with: { tag: true },
      },
    },
  });
}

// 后台使用：包含草稿，并带上标签
export async function getAllArticles() {
  return db.query.articles.findMany({
    orderBy: desc(articles.createdAt),
    with: {
      articleTags: {
        with: { tag: true },
      },
    },
  });
}

export async function getArticleByIdWithTags(id: string) {
  return db.query.articles.findFirst({
    where: eq(articles.id, id),
    with: {
      articleTags: {
        with: { tag: true },
      },
    },
  });
}

// ---------- 写入 ----------

function toSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '') || nanoid(8)
  );
}

export async function createArticle(data: {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  published?: boolean;
  tagIds?: string[];
}) {
  const now = new Date().toISOString();
  const id = nanoid();
  const slug = data.slug?.trim() || toSlug(data.title);

  await db.insert(articles).values({
    id,
    title: data.title,
    slug,
    content: data.content,
    excerpt: data.excerpt ?? null,
    published: data.published ?? false,
    createdAt: now,
    updatedAt: now,
  });

  if (data.tagIds?.length) {
    await db.insert(articlesToTags).values(
      data.tagIds.map((tagId) => ({ articleId: id, tagId })),
    );
  }

  return id;
}

export async function updateArticle(
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string;
    published?: boolean;
    tagIds?: string[];
  },
) {
  const { tagIds, ...fields } = data;
  await db
    .update(articles)
    .set({ ...fields, updatedAt: new Date().toISOString() })
    .where(eq(articles.id, id));

  // 全量替换标签关联
  if (tagIds) {
    await db.delete(articlesToTags).where(eq(articlesToTags.articleId, id));
    if (tagIds.length) {
      await db.insert(articlesToTags).values(
        tagIds.map((tagId) => ({ articleId: id, tagId })),
      );
    }
  }
}

export async function deleteArticle(id: string) {
  await db.delete(articlesToTags).where(eq(articlesToTags.articleId, id));
  await db.delete(articles).where(eq(articles.id, id));
}

// ---------- 统计 ----------

export async function getArticleStats() {
  const rows = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`sum(case when ${articles.published} then 1 else 0 end)`,
    })
    .from(articles);
  return { total: rows[0]?.total ?? 0, published: rows[0]?.published ?? 0 };
}

// ---------- 标签 ----------

export async function getAllTags() {
  const all = await db.select().from(tags);
  const usage = await db
    .select({
      tagId: articlesToTags.tagId,
      count: sql<number>`count(*)`,
    })
    .from(articlesToTags)
    .groupBy(articlesToTags.tagId);

  const usageMap = new Map(usage.map((u) => [u.tagId, u.count]));
  return all
    .map((tag) => ({ ...tag, count: usageMap.get(tag.id) ?? 0 }))
    .sort((a, b) => b.count - a.count);
}

// 前台展示：已发布文章实际用到的标签及数量
export async function getPublishedTags() {
  const rows = await db
    .select({
      id: tags.id,
      name: tags.name,
      count: sql<number>`count(*)`,
    })
    .from(articlesToTags)
    .innerJoin(tags, eq(articlesToTags.tagId, tags.id))
    .innerJoin(articles, eq(articlesToTags.articleId, articles.id))
    .where(eq(articles.published, true))
    .groupBy(tags.id)
    .orderBy(desc(sql`count(*)`));
  return rows;
}

export async function createTag(name: string) {
  const existing = await db.query.tags.findFirst({
    where: eq(tags.name, name.trim()),
  });
  if (existing) return existing.id;
  const id = nanoid();
  await db.insert(tags).values({ id, name: name.trim() });
  return id;
}

export async function deleteTag(id: string) {
  await db.delete(articlesToTags).where(eq(articlesToTags.tagId, id));
  await db.delete(tags).where(eq(tags.id, id));
}

export async function tagsExist(tagIds: string[]) {
  if (!tagIds.length) return false;
  const rows = await db
    .select({ id: tags.id })
    .from(tags)
    .where(inArray(tags.id, tagIds));
  return rows.length === tagIds.length;
}
