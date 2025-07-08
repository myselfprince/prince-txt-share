// 'use client';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function ViewPage() {
//   const { id } = useParams();
//   const [text, setText] = useState(null);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/get?id=${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.text) setText(data.text);
//         else setNotFound(true);
//       });
//   }, [id]);

//   if (notFound) return <h2 style={{ padding: 20 }}>❌ No text found for this link.</h2>;
//   if (!text) return <h2 style={{ padding: 20 }}>Loading...</h2>;

//   return (
//     <main style={{ maxWidth: 800, margin: '50px auto', padding: '0 20px' }}>
//       <h2>📄 Shared Text</h2>
//       <pre style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: 20 }}>{text}</pre>
//     </main>
//   );
// }


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

  if (notFound) return <h2 className="text-2xl font-semibold text-red-600 p-6">❌ No text found for this link.</h2>;
  if (!text) return <h2 className="text-2xl font-semibold text-gray-600 p-6">Loading...</h2>;

  return (
    // <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10">
    //   <Toaster
    //     position="top-center"
    //     reverseOrder={false}
    //   />
    //   <div className="max-w-4xl mx-auto px-4">
    //     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
    //       <div className="flex justify-end mb-4">
    //         <button
    //           onClick={copyToClipboard}
    //           className="cursor-pointer bg-gray-800 text-white px-3 py-1 rounded flex items-center space-x-2 hover:bg-gray-700"
    //         >
    //           <span>Copy Text</span>
    //           <svg
    //             className="w-4 h-4"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
    //         📄PS17 - Shared Text
    //       </h1>
    //       <div className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg border border-gray-100">
    //         <pre className="text-gray-800 whitespace-pre-wrap break-words">{text}</pre>
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <div>404 </div>
  );
}