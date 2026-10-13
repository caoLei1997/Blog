import { NextResponse } from 'next/server';
import { deleteTag } from '@/lib/articles';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await deleteTag(id);
  return NextResponse.json({ success: true });
}
