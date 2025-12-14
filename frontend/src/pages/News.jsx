import React from 'react';
import { newsArticles } from '../data/news';

const News = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">News</h1>
        <h2 className="text-lg font-semibold mb-1">TOP PICKS FOR YOU</h2>
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-6">LATEST NEWS OF THIS WEEK</p>
      </div>

      {/* News Cards */}
      <div className="px-6 space-y-6">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-900/20 transition"
          >
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-4xl mb-2">🚀</p>
                <p className="text-xs">Article Image</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-3 line-clamp-3">{article.headline}</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400 font-semibold">{article.source}</span>
                <span className="text-sm text-gray-400">{article.date}</span>
              </div>
              <button className="text-purple-400 font-semibold text-sm hover:text-purple-300 transition">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;

