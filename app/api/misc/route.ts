import { NextResponse } from 'next/server';
import { getAllMisc, createMisc } from '@/lib/misc';

export async function GET() {
  const items = await getAllMisc();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createMisc(body);
  return NextResponse.json({ id }, { status: 201 });
}
