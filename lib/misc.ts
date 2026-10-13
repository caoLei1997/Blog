import { nanoid } from 'nanoid';
import { eq, desc, sql } from 'drizzle-orm';
import { db } from './db/index';
import { misc } from './db/schema';

export async function getMiscList() {
  return db.query.misc.findMany({
    where: eq(misc.published, true),
    orderBy: desc(misc.createdAt),
  });
}

export async function getMiscById(id: string) {
  return db.query.misc.findFirst({
    where: eq(misc.id, id),
  });
}

export async function getAllMisc() {
  return db.query.misc.findMany({
    orderBy: desc(misc.createdAt),
  });
}

export async function createMisc(data: {
  title: string;
  content: string;
  excerpt?: string;
  cover?: string;
  published?: boolean;
}) {
  const now = new Date().toISOString();
  const id = nanoid();
  await db.insert(misc).values({
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

export async function updateMisc(id: string, data: {
  title?: string;
  content?: string;
  excerpt?: string;
  cover?: string;
  published?: boolean;
}) {
  await db.update(misc)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(misc.id, id));
}

export async function deleteMisc(id: string) {
  await db.delete(misc).where(eq(misc.id, id));
}

export async function getMiscStats() {
  const rows = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`sum(case when ${misc.published} then 1 else 0 end)`,
    })
    .from(misc);
  return { total: rows[0]?.total ?? 0, published: rows[0]?.published ?? 0 };
}
