import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { life, misc, photography } from '@/lib/db/schema';
import { isNotNull } from 'drizzle-orm';

// 媒体库：汇总全站正在使用的图片（摄影 + 各栏目封面），供后台复制链接
export async function GET() {
  const [photos, lifeCovers, miscCovers] = await Promise.all([
    db.select({ url: photography.imageUrl }).from(photography),
    db.select({ url: life.cover }).from(life).where(isNotNull(life.cover)),
    db.select({ url: misc.cover }).from(misc).where(isNotNull(misc.cover)),
  ]);

  const seen = new Set<string>();
  const items: { url: string; source: string }[] = [];
  const push = (url: string | null, source: string) => {
    if (url && !seen.has(url)) {
      seen.add(url);
      items.push({ url, source });
    }
  };

  photos.forEach((p) => push(p.url, '摄影'));
  lifeCovers.forEach((c) => push(c.url, '人生路封面'));
  miscCovers.forEach((c) => push(c.url, '杂烩封面'));

  return NextResponse.json(items);
}
