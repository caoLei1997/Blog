import { NextResponse } from 'next/server';
import { getLifeById, updateLife, deleteLife } from '@/lib/life';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await getLifeById(id);
  if (!item) {
    return NextResponse.json({ error: '不存在' }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  await updateLife(id, body);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteLife(id);
  return NextResponse.json({ success: true });
}
