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

// 杂烩表
export const misc = sqliteTable('misc', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  cover: text('cover'),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// 人生路表
export const life = sqliteTable('life', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  cover: text('cover'),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// 摄影表
export const photography = sqliteTable('photography', {
  id: text('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
});