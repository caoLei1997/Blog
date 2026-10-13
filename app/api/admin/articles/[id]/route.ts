import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getArticleByIdWithTags,
  updateArticle,
  deleteArticle,
} from '@/lib/articles';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const item = await getArticleByIdWithTags(id);
  if (!item) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  if (body.title !== undefined && !body.title.trim()) {
    return NextResponse.json({ error: '标题不能为空' }, { status: 400 });
  }

  await updateArticle(id, {
    title: body.title,
    slug: body.slug,
    content: body.content,
    excerpt: body.excerpt,
    published: body.published,
    tagIds: body.tagIds,
  });

  revalidatePath('/articles');
  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  await deleteArticle(id);
  revalidatePath('/articles');
  return NextResponse.json({ success: true });
}
