import { NextResponse } from 'next/server';
import { getAllPhotography, createPhotography } from '@/lib/photography';

export async function GET() {
  const items = await getAllPhotography();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createPhotography(body);
  return NextResponse.json({ id }, { status: 201 });
}
