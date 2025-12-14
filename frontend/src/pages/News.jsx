import React from 'react';
import { useTheme } from '../context/useTheme';
import { newsArticles } from '../data/news';

const News = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">News</h1>
        <h2 className="text-lg font-semibold mb-1">TOP PICKS FOR YOU</h2>
        <p className={`text-sm uppercase tracking-widest mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>LATEST NEWS OF THIS WEEK</p>
      </div>

      {/* News Cards */}
      <div className="px-6 space-y-6">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className={`rounded-lg overflow-hidden shadow-lg hover:shadow-purple-900/20 transition ${isDark ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}
          >
            {/* News Image */}
            <div className={`h-48 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <img 
                src={article.image} 
                alt={article.headline}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="h-full flex items-center justify-center"><div class="text-center text-gray-500"><p class="text-4xl mb-2">🚀</p><p class="text-xs">Article Image</p></div></div>';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-3 line-clamp-3">{article.headline}</h3>
              <div className="flex justify-between items-center mb-3">
                <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{article.source}</span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{article.date}</span>
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

