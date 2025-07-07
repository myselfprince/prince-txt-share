import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('texts');
    const result = await collection.findOne({ id });

    if (!result) {
      return NextResponse.json({ text: null }, { status: 404 });
    }

    return NextResponse.json({ text: result.text });
  } catch (e) {
    return NextResponse.json({ error: 'DB fetch failed' }, { status: 500 });
  }
}
