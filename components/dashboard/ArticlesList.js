'use client';

import { useState } from 'react';
import { List, LayoutGrid } from 'lucide-react';

export default function ArticlesList() {
  const [view, setView] = useState('list');

  const articles = [
    {
      title: 'Latest Medical Research Updates',
      url: 'https://example.com/article1',
      date: '2024-03-20'
    },
    {
      title: 'New Treatment Guidelines',
      url: 'https://example.com/article2',
      date: '2024-03-19'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Articles</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-md border ${
              view === 'list' ? 'bg-blue-600 text-white' : 'text-blue-600'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-md border ${
              view === 'grid' ? 'bg-blue-600 text-white' : 'text-blue-600'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium text-blue-600">{article.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{article.date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
