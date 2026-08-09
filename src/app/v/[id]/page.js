'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

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
    <main className="min-h-screen bg-black py-10 text-gray-100">
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
      <div className="w-full px-4 md:px-8 lg:px-16 mx-auto">
        <div className="bg-black rounded-xl p-6 border border-neutral-800">
          
          <div className="flex justify-between mb-4">
           <Link
                    className= "bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors shadow-md cursor-pointer px-4 py-2"
                    type="button"
                    href="/"
                >
                   Home
                </Link>
            <button
              onClick={copyToClipboard}
              className="cursor-pointer bg-neutral-800 text-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-neutral-700 transition-colors border border-neutral-700"
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

          <div className="prose prose-lg max-w-none bg-black p-0 md:p-4 rounded-lg">
            <pre className="text-neutral-300 whitespace-pre-wrap break-words font-mono text-sm md:text-base leading-relaxed">
              {text}
            </pre>
          </div>
          
        </div>
      </div>
    </main>
  );
}