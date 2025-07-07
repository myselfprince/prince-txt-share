'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!', {
      duration: 1000,
      position: 'top-center',
    });
  };


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
     <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h1 className='text-2xl font-bold mb-3'>📄 Welcome to PS17</h1>
      <label htmlFor="share-text" style={{ fontWeight: 'bold' }}>Enter Text Below</label><br />
      <textarea
      className='border p-2 rounded border-gray-300 h-[100px]'
        id="share-text"
        name="share-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        rows={15}
        style={{ width: '100%', fontSize: 16 }}
      />
      <br /><br />
      {/* <button
      className='bg-green-600 text-white rounded hover:bg-green-700'
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
      )} */}

      <button
        className='bg-green-600 text-white rounded hover:bg-green-700'
        type="button"
        onClick={handleSubmit}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        🔗 Create Shareable Link
      </button>
   
      {link && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800 mb-2">Share this link:</p>
          <div className="flex items-center space-x-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-blue-600 hover:text-blue-800 break-all"
            >
              {link}
            </a>
            <button
              onClick={copyToClipboard}
              className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              title="Copy link to clipboard"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

