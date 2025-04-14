'use client';

import { useState } from 'react';

export default function ChatGPTSearch() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ChatGPT Search</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a medical question..."
          className="flex-1 p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
}