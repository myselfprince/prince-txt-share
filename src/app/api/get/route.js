import { NextResponse } from 'next/server';

// Reuse the same in-memory store
const store = globalThis._store || (globalThis._store = {});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const text = store[id];

  if (text) {
    return NextResponse.json({ text });
  } else {
    return NextResponse.json({ text: null }, { status: 404 });
  }
}
