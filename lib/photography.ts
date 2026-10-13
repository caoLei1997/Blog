import { nanoid } from 'nanoid';
import { eq, desc, sql } from 'drizzle-orm';
import { db } from './db/index';
import { photography } from './db/schema';

export async function getPhotographyList() {
  return db.query.photography.findMany({
    where: eq(photography.published, true),
    orderBy: desc(photography.createdAt),
  });
}

export async function getPhotographyById(id: string) {
  return db.query.photography.findFirst({
    where: eq(photography.id, id),
  });
}

export async function getAllPhotography() {
  return db.query.photography.findMany({
    orderBy: desc(photography.createdAt),
  });
}

export async function createPhotography(data: {
  title?: string;
  description?: string;
  imageUrl: string;
  published?: boolean;
}) {
  const now = new Date().toISOString();
  const id = nanoid();
  await db.insert(photography).values({
    id,
    title: data.title ?? null,
    description: data.description ?? null,
    imageUrl: data.imageUrl,
    published: data.published ?? false,
    createdAt: now,
  });
  return id;
}

export async function updatePhotography(id: string, data: {
  title?: string;
  description?: string;
  imageUrl?: string;
  published?: boolean;
}) {
  await db.update(photography)
    .set(data)
    .where(eq(photography.id, id));
}

export async function deletePhotography(id: string) {
  await db.delete(photography).where(eq(photography.id, id));
}

export async function getPhotographyStats() {
  const rows = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`sum(case when ${photography.published} then 1 else 0 end)`,
    })
    .from(photography);
  return { total: rows[0]?.total ?? 0, published: rows[0]?.published ?? 0 };
}
