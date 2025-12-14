import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/useTheme';

const Splash = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className={`h-screen flex flex-col items-center justify-center px-8 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="mb-12 relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl absolute -top-4 -left-4"></div>
        <img src="/favicon.png" alt="Stella Logo" className="w-28 h-28 relative z-10" />
      </div>

      <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>STELLA</h1>
      <p className={`mb-12 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>The Universe, Pocket-Sized</p>

      <button 
        onClick={() => navigate('/')}
        className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full shadow-lg shadow-purple-900/50 hover:scale-105 transition"
      >
        Start Exploring →
      </button>
    </div>
  );
};

export default Splash;

