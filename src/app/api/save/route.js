// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import clientPromise from '@/lib/mongodb';

// export async function POST(req) {
//   const { text } = await req.json();
//   const id = uuidv4().slice(0, 8);

//   try {
//     const client = await clientPromise;
//     const db = client.db();
//     const collection = db.collection('texts');
//     await collection.insertOne({ id, text });
//     return NextResponse.json({ id });
//   } catch (e) {
//     return NextResponse.json({ error: 'DB insert failed' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const words = ['cat', 'dog', 'sun', 'moon', 'fat', 'mat', 'house', 'cup', 'fan','add', 'air', 'all', 'and', 'ant', 'any', 'arm', 'art', 'ask', 'ate', 'bad','sat', 'saw', 'say', 'sea', 'see', 'set', 'she', 'shy', 'sit', 'six', 'sky', 'son', 'top', 'toy', 'try', 'two', 'use', 'war', 'was', 'way', 'who', 'why', 'yes', 'you', 'zip', 'zoo', 'act', 'age', 'aim', 'air', 'ale', 'all', 'and', 'ant', 'any', 'ape', 'apt', 'arc', 'are', 'ash', 'ask', 'ate', 'awe', 'axe', 'bad', 'bag', 'bat', 'bed', 'bee', 'beg', 'bet', 'bid', 'big', 'bin', 'bit', 'bow', 'box'];

function generateRandomId() {
  // 50% chance word, 50% chance 3-digit number
  const useWord = Math.random() < 0.5;
  if (useWord) {
    return words[Math.floor(Math.random() * words.length)];
  } else {
    return String(Math.floor(100 + Math.random() * 900)); // 100–999
  }
}

export async function POST(req) {
  const { text, customWord } = await req.json();

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('texts');

  let id = '';

  if (customWord && /^[a-zA-Z0-9_-]{2,15}$/.test(customWord)) {
    // Check if custom word is already taken
    const existing = await collection.findOne({ id: customWord });
    if (existing) {
      return NextResponse.json({ error: 'This word is already taken. Try another one.' }, { status: 409 });
    }
    id = customWord.toLowerCase();
  } else {
    // Generate random unique ID
    while (true) {
      const generated = generateRandomId();
      const exists = await collection.findOne({ id: generated });
      if (!exists) {
        id = generated;
        break;
      }
    }
  }

  try {
    await collection.insertOne({ id, text });
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json({ error: 'DB insert failed' }, { status: 500 });
  }
}
