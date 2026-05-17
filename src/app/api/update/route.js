import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function PUT(req) {
  try {
    const { id, text } = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('texts');
    
    const result = await collection.updateOne({ id }, { $set: { text } });
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Text not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}