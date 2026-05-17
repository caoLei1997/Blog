import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),            // nanoid
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),     // Markdown 原文
  excerpt: text('excerpt'),               // 摘要
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const tags = sqliteTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
});

// 文章-标签 关联表
export const articlesToTags = sqliteTable('articles_to_tags', {
  articleId: text('article_id').references(() => articles.id),
  tagId: text('tag_id').references(() => tags.id),
});