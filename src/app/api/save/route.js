// import { v4 as uuidv4 } from 'uuid';

// const store = globalThis._store || (globalThis._store = {});

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const id = uuidv4().slice(0, 8);
//     store[id] = req.body.text || '';
//     res.status(200).json({ id });
//   } else {
//     res.status(405).end();
//   }
// }

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Use global variable to simulate temporary in-memory store
const store = globalThis._store || (globalThis._store = {});

export async function POST(req) {
  const { text } = await req.json();
  const id = uuidv4().slice(0, 8);
  store[id] = text || '';
  return NextResponse.json({ id });
}
