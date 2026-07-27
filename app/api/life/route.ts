import { NextResponse } from 'next/server';
import { getAllLife, createLife } from '@/lib/life';

export async function GET() {
  const items = await getAllLife();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createLife(body);
  return NextResponse.json({ id }, { status: 201 });
}
