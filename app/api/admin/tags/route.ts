import { NextResponse } from 'next/server';
import { getAllTags, createTag } from '@/lib/articles';

export async function GET() {
  const items = await getAllTags();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name?.trim()) {
    return NextResponse.json({ error: '标签名不能为空' }, { status: 400 });
  }

  const id = await createTag(body.name);
  return NextResponse.json({ id }, { status: 201 });
}
