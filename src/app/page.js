'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    if (data.id) {
      setLink(`${location.origin}/view/${data.id}`);
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: '50px auto', padding: '0 20px' }}>
      <h1>📄 Share Text Instantly</h1>
      <label htmlFor="share-text" style={{ fontWeight: 'bold' }}>Enter Text</label><br />
      <textarea
        id="share-text"
        name="share-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        rows={15}
        style={{ width: '100%', fontSize: 16 }}
      />
      <br /><br />
      <button
        type="button"
        onClick={handleSubmit}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        🔗 Create Shareable Link
      </button>

      {link && (
        <div style={{ marginTop: 20 }}>
          <b>Share this link:</b><br />
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </div>
      )}
    </main>
  );
}
