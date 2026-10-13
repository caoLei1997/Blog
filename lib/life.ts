import { nanoid } from 'nanoid';
import { eq, desc, sql } from 'drizzle-orm';
import { db } from './db/index';
import { life } from './db/schema';

export async function getLifeList() {
  return db.query.life.findMany({
    where: eq(life.published, true),
    orderBy: desc(life.createdAt),
  });
}

export async function getLifeById(id: string) {
  return db.query.life.findFirst({
    where: eq(life.id, id),
  });
}

export async function getAllLife() {
  return db.query.life.findMany({
    orderBy: desc(life.createdAt),
  });
}

export async function createLife(data: {
  title: string;
  content: string;
  excerpt?: string;
  cover?: string;
  published?: boolean;
}) {
  const now = new Date().toISOString();
  const id = nanoid();
  await db.insert(life).values({
    id,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt ?? null,
    cover: data.cover ?? null,
    published: data.published ?? false,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function updateLife(id: string, data: {
  title?: string;
  content?: string;
  excerpt?: string;
  cover?: string;
  published?: boolean;
}) {
  await db.update(life)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(life.id, id));
}

export async function deleteLife(id: string) {
  await db.delete(life).where(eq(life.id, id));
}

export async function getLifeStats() {
  const rows = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`sum(case when ${life.published} then 1 else 0 end)`,
    })
    .from(life);
  return { total: rows[0]?.total ?? 0, published: rows[0]?.published ?? 0 };
}
