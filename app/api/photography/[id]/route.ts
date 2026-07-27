import { NextResponse } from 'next/server';
import { getPhotographyById, updatePhotography, deletePhotography } from '@/lib/photography';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await getPhotographyById(id);
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
  await updatePhotography(id, body);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deletePhotography(id);
  return NextResponse.json({ success: true });
}
