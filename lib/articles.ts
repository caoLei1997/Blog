import { nanoid } from 'nanoid';
import { eq, desc } from 'drizzle-orm';
import { db } from './db/index';
import { articles, tags, articlesToTags } from './db/schema';


export async function getArticles() {
  return db.query.articles.findMany({
    where: eq(articles.published, true),
    orderBy: desc(articles.createdAt),
  });
}

export async function getArticleById(slug: string) {
  return db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });
}
