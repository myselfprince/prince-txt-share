'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewPage() {
  const { id } = useParams(); // ✅ FIXED: useParams() hook
  const [text, setText] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/get?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.text) setText(data.text);
        else setNotFound(true);
      });
  }, [id]);

  if (notFound) return <h2 style={{ padding: 20 }}>❌ No text found for this link.</h2>;
  if (!text) return <h2 style={{ padding: 20 }}>Loading...</h2>;

  return (
    <main style={{ maxWidth: 800, margin: '50px auto', padding: '0 20px' }}>
      <h2>📄 Shared Text</h2>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: 20 }}>{text}</pre>
    </main>
  );
}
