'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function AllLinksDashboard() {
  const [data, setData] = useState({ texts: [], total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchLinks = async (currentPage, searchQuery) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/all?page=${currentPage}&limit=10&search=${searchQuery}`);
      const json = await res.json();
      if (!json.error) setData(json);
    } catch (err) {
      toast.error('Failed to load links.');
    }
    setLoading(false);
  };

  useEffect(() => {
    // Debounce search query to prevent spamming API
    const delayDebounceFn = setTimeout(() => {
      fetchLinks(page, search);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete the link: ${id}?`)) return;
    
    const toastId = toast.loading('Deleting...');
    try {
      const res = await fetch(`/api/delete?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      
      if (json.success) {
        toast.success('Deleted successfully', { id: toastId });
        fetchLinks(page, search); // Refresh list
      } else {
        toast.error(json.error || 'Failed to delete', { id: toastId });
      }
    } catch (err) {
      toast.error('Error deleting link', { id: toastId });
    }
  };

  const handleUpdate = async () => {
    const toastId = toast.loading('Saving changes...');
    try {
      const res = await fetch('/api/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingItem.id, text: editText }),
      });
      const json = await res.json();

      if (json.success) {
        toast.success('Updated successfully', { id: toastId });
        setEditingItem(null); // Close modal
        fetchLinks(page, search); // Refresh list
      } else {
        toast.error(json.error || 'Failed to update', { id: toastId });
      }
    } catch (err) {
      toast.error('Error updating text', { id: toastId });
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditText(item.text);
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 py-10">
      <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      
      <div className="w-full px-4 md:px-8 lg:px-16 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            🗂️ Links Dashboard
          </h1>
          
          <div className='flex space-x-4'>
            <Link
                    className= "bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors shadow-md cursor-pointer px-4 py-2"
                    type="button"
                    href="/"
                >
                   Home
                </Link>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            + Create New
          </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by link name (e.g. dog)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset to page 1 on new search
            }}
            className="w-full md:w-1/3 border p-3 rounded-lg border-neutral-800 bg-black text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>

        {/* Data Table */}
        <div className="bg-black rounded-xl shadow-lg border border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-neutral-300">
                  <th className="p-4 font-semibold border-b border-neutral-800">Link ID</th>
                  <th className="p-4 font-semibold border-b border-neutral-800">Text Preview</th>
                  <th className="p-4 font-semibold border-b border-neutral-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-400">Loading links...</td>
                  </tr>
                ) : data.texts.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-400">No links found.</td>
                  </tr>
                ) : (
                  data.texts.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-900 border-b border-neutral-800 transition-colors">
                      <td className="p-4 font-medium text-blue-400">
                        <Link href={`/v/${item.id}`} className="hover:underline">
                          {item.id}
                        </Link>
                      </td>
                      <td className="p-4 text-neutral-300 truncate max-w-xs">
                        {item.text.length > 60 ? item.text.substring(0, 60) + '...' : item.text}
                      </td>
                      <td className="p-4 flex justify-end space-x-3">
                        <button
                          onClick={() => openEditModal(item)}
                          className="bg-neutral-800 text-neutral-200 px-3 py-1 rounded hover:bg-neutral-700 transition-colors border border-neutral-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-900 text-red-200 px-3 py-1 rounded hover:bg-red-800 transition-colors border border-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && data.totalPages > 1 && (
            <div className="p-4 border-t border-neutral-800 flex justify-between items-center bg-black">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-neutral-800 text-neutral-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-neutral-400">
                Page <strong className="text-neutral-100">{page}</strong> of {data.totalPages}
              </span>
              <button
                disabled={page >= data.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-neutral-800 text-neutral-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-black w-full max-w-2xl rounded-xl shadow-2xl border border-neutral-800 p-6">
            <h2 className="text-2xl font-bold mb-4">Editing Link: <span className="text-blue-400">{editingItem.id}</span></h2>
            <textarea
              className="w-full border p-3 rounded-lg border-neutral-800 bg-black text-neutral-200 h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingItem(null)}
                className="bg-neutral-800 text-neutral-200 px-4 py-2 rounded hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}