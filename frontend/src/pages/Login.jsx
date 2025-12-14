import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/useTheme';

const Login = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className={`h-screen flex flex-col items-center justify-center px-8 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Logo Placeholder */}
      <div className="mb-12 relative">
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-2xl absolute -top-4 -left-4"></div>
        <img src="/6400117.png" alt="Stella Logo" className="w-32 h-32 relative z-10" />
      </div>

      <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Welcome Back</h1>

      <form className="w-full space-y-4">
        <div>
          <label className={`text-xs ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Username</label>
          <input 
            type="text" 
            className={`w-full border rounded-full px-6 py-3 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className={`text-xs ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Password</label>
          <input 
            type="password" 
            className={`w-full border rounded-full px-6 py-3 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            placeholder="••••••••"
          />
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-full mt-6 shadow-lg shadow-purple-900/50 hover:bg-purple-700 hover:scale-[1.02] transition-all duration-200"
        >
          Login
        </button>
      </form>
      
      <p className={`mt-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
        Don't have an account? <span className="text-purple-400 font-bold cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;