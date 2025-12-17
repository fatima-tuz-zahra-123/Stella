import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/useTheme';
import { newsArticles } from '../data/news';
import { FaPlay, FaPause, FaStop, FaVolumeUp } from 'react-icons/fa';

const News = () => {
  const { isDark } = useTheme();
  const [playingId, setPlayingId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const speechSynthesisRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayAudio = (article) => {
    // Check if browser supports speech synthesis
    if (!window.speechSynthesis) {
      alert('Sorry, your browser does not support text-to-speech.');
      return;
    }

    // If already playing this article and paused, resume
    if (playingId === article.id && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const text = `${article.headline}. ${article.excerpt}. Published by ${article.source} on ${article.date}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure utterance
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1;
    utterance.volume = 1;

    // Event handlers
    utterance.onend = () => {
      setPlayingId(null);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setPlayingId(null);
      setIsPaused(false);
    };

    // Start speaking
    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlayingId(article.id);
    setIsPaused(false);
  };

  const handlePauseAudio = () => {
    if (window.speechSynthesis && playingId) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      setIsPaused(false);
    }
  };

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">News</h1>
          <div className="flex items-center gap-2 text-purple-500">
            <FaVolumeUp className="text-lg" />
            <span className="text-xs font-semibold">Audio Available</span>
          </div>
        </div>
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

              {/* Audio Controls */}
              <div className="flex items-center gap-3 mb-3">
                {playingId === article.id ? (
                  <>
                    {isPaused ? (
                      <button
                        onClick={() => handlePlayAudio(article)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition font-semibold text-sm"
                        aria-label="Resume audio"
                      >
                        <FaPlay /> Resume
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseAudio}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition font-semibold text-sm"
                        aria-label="Pause audio"
                      >
                        <FaPause /> Pause
                      </button>
                    )}
                    <button
                      onClick={handleStopAudio}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition font-semibold text-sm ${
                        isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300'
                      }`}
                      aria-label="Stop audio"
                    >
                      <FaStop /> Stop
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handlePlayAudio(article)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition font-semibold text-sm"
                    aria-label="Listen to article"
                  >
                    <FaPlay /> Listen
                  </button>
                )}
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

