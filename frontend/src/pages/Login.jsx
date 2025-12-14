import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black px-8">
      {/* Logo Placeholder */}
      <div className="mb-12 relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl absolute -top-2 -left-2"></div>
        <img src="/favicon.png" alt="Stella Logo" className="w-20 h-20 relative z-10" />
      </div>

      <h1 className="text-3xl font-bold mb-8">Welcome Back</h1>

      <form className="w-full space-y-4">
        <div>
          <label className="text-xs text-gray-400 ml-2">Username</label>
          <input 
            type="text" 
            className="w-full bg-gray-900 border border-gray-700 rounded-full px-6 py-3 text-white focus:outline-none focus:border-purple-500"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 ml-2">Password</label>
          <input 
            type="password" 
            className="w-full bg-gray-900 border border-gray-700 rounded-full px-6 py-3 text-white focus:outline-none focus:border-purple-500"
            placeholder="••••••••"
          />
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-full mt-6 shadow-lg shadow-purple-900/50"
        >
          Login
        </button>
      </form>
      
      <p className="mt-6 text-gray-500 text-sm">
        Don't have an account? <span className="text-purple-400 font-bold cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;