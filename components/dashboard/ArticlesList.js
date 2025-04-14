'use client';

export default function ArticlesList() {
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
      <h2 className="text-xl font-semibold mb-4">Articles</h2>
      <div className="space-y-4">
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