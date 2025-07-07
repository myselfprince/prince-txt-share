import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  const { text } = await req.json();
  const id = uuidv4().slice(0, 8);

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('texts');
    await collection.insertOne({ id, text });
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json({ error: 'DB insert failed' }, { status: 500 });
  }
}
