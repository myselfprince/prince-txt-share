'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [customWord, setCustomWord] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, customWord }),
    });
    
    const data = await res.json();
    
    if (data.error) {
      toast.error(data.error, { duration: 1500 });
      return;
    }
    if (data.id) {
      setLink(`${location.origin}/v/${data.id}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!', {
      duration: 1000,
      position: 'top-center',
    });
  };

  return (
    <main style={{ maxWidth: 800, margin: '50px auto', padding: '0 20px' }}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      
      <h1 className='text-3xl font-bold text-gray-100 mb-4 flex items-center'>
        📄 Welcome to PS17 - Text Share
      </h1>
      
      <label htmlFor="share-text" className="font-bold text-gray-200">
        Enter Text Below
      </label>
      <br />
      <textarea
        className='border p-3 rounded-lg border-gray-700 bg-gray-800 text-gray-100 h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
        id="share-text"
        name="share-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        style={{ width: '100%', fontSize: 16 }}
      />
      <br /><br />
      
      <label htmlFor="custom-word" className="font-semibold mt-4 block text-gray-200">
        Optional Custom Link (e.g. dog, 121, hello):
      </label>
      <input
        id="custom-word"
        type="text"
        value={customWord}
        onChange={(e) => setCustomWord(e.target.value)}
        placeholder="custom-url word (optional)"
        className="border p-2 rounded-lg border-gray-700 bg-gray-800 text-gray-100 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      />
      <br /><br />
      
      <button
        className='bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors shadow-md'
        type="button"
        onClick={handleSubmit}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        🔗 Easy to Remember Link
      </button>

      {link && (
        <div className="mt-8 p-5 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <p className="text-lg font-semibold text-gray-200 mb-3">Share this link:</p>
          <div className="flex items-center space-x-3">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-blue-400 hover:text-blue-300 break-all underline-offset-2 hover:underline"
            >
              {link}
            </a>
            <button
              onClick={copyToClipboard}
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors shadow-md"
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