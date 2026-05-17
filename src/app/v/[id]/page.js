'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ViewPage() {
  const { id } = useParams();
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text || '');
    toast.success('Text copied to clipboard!', {
      duration: 1000,
      position: 'top-center',
    });
  };

  if (notFound) 
    return <h2 className="text-2xl font-semibold text-red-400 p-6">❌ No text found for this link.</h2>;
  
  if (!text) 
    return <h2 className="text-2xl font-semibold text-gray-400 p-6">Loading...</h2>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10">
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
          
          <div className="flex justify-end mb-4">
            <button
              onClick={copyToClipboard}
              className="cursor-pointer bg-gray-700 text-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-colors border border-gray-600"
            >
              <span>Copy Text</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-100 mb-4 flex items-center">
            📄PS17 - Shared Text
          </h1>

          <div className="prose prose-lg max-w-none bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-inner">
            <pre className="text-gray-200 whitespace-pre-wrap break-words font-mono text-sm md:text-base">
              {text}
            </pre>
          </div>
          
        </div>
      </div>
    </main>
  );
}