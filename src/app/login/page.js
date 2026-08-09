'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Access Granted!');
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      } else {
        toast.error(data.error || 'Incorrect password');
      }
    } catch (err) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 flex items-center justify-center p-4">
      <Toaster position="top-center" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid #333' } }} />
      <div className="bg-black w-full max-w-md rounded-xl p-8 border border-neutral-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🔒 Restricted Access</h1>
          <p className="text-neutral-400">Please enter the password to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full border p-3 rounded-lg border-neutral-800 bg-black text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-center text-lg tracking-widest"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-700 transition-colors shadow-md px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-700"
          >
            {loading ? 'Verifying...' : 'Access Application'}
          </button>
        </form>
      </div>
    </main>
  );
}
