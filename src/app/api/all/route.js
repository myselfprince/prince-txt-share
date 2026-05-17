import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const search = searchParams.get('search') || '';
  
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('texts');

    // If search is provided, look for matching IDs
    const query = search ? { id: { $regex: search, $options: 'i' } } : {};
    
    const total = await collection.countDocuments(query);
    const texts = await collection
      .find(query)
      .sort({ _id: -1 }) // Sort by newest first
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      texts: texts.map(t => ({ id: t.id, text: t.text })),
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch texts' }, { status: 500 });
  }
}