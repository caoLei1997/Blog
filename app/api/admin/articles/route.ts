import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllArticles, createArticle } from '@/lib/articles';

export async function GET() {
  const items = await getAllArticles();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: '标题和内容不能为空' }, { status: 400 });
  }

  const id = await createArticle({
    title: body.title,
    slug: body.slug,
    content: body.content,
    excerpt: body.excerpt,
    published: body.published ?? false,
    tagIds: body.tagIds,
  });

  revalidatePath('/articles');
  return NextResponse.json({ id }, { status: 201 });
}
