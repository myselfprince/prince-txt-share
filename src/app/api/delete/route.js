import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('texts');
    
    const result = await collection.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Text not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}