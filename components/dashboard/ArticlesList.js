'use client';

import { useState } from 'react';
import { List, LayoutGrid, Grid2X2 } from 'lucide-react';
import Button from '../common/Button';


export default function ArticlesList() {
  const [view, setView] = useState('grid');
  const [viewMode, setViewMode] = useState('grid');

  const articles = [
    {
      title: 'Article1',
      url: 'https://example.com/article1',
    },
    {
      title: 'Article2',
      url: 'https://example.com/article2',
    },
    {
      title: 'Article3',
      url: 'https://example.com/article3',
    },
    {
      title: 'Article4',
      url: 'https://example.com/article4',
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-md font-bold">Articles</h2>
        <div className="flex space-x-2">
          {/* <button
            onClick={() => setView('list')}
            className={`p-2 rounded-2xl ${
              view === 'list' ? 'bg-blue-600 text-white' : 'text-blue-600'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-2xl ${
              view === 'grid' ? 'bg-blue-600 text-white' : 'text-blue-600'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button> */}
                    <Button
                      className={`p-2 rounded-2xl`}
                      size="icon"
                      variant={viewMode === 'list' ? 'primary' : 'ghost'}
                      onClick={() => setView('list')}
                      tooltip="List view"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      
                      size="icon"
                      variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                      onClick={() => setView('grid')}
                      tooltip="Grid view"
                    >
                      <Grid2X2 className="h-4 w-4" />
                    </Button>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-4 md:grid-cols-2 gap-2' : 'space-y-2'}>
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded-2xl hover:bg-gray-50"
          >
            <p className="text-sm text-blue-600 mt-1 text-center">{article.title}</p>
            <p className="text-sm text-gray-500 mt-1 text-center">{article.date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
