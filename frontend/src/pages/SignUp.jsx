import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      navigate('/home');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black px-8">
      <div className="mb-12 relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl absolute -top-2 -left-2"></div>
        <img src="/favicon.png" alt="Stella Logo" className="w-20 h-20 relative z-10" />
      </div>

      <h1 className="text-3xl font-bold mb-2">STELLA</h1>
      <h2 className="text-xl font-bold mb-8">Create Account</h2>

      <form className="w-full space-y-4" onSubmit={handleSignUp}>
        <div>
          <label className="text-xs text-gray-400 ml-2">Username</label>
          <input 
            type="text" 
            className="w-full bg-gray-900 border border-gray-700 rounded-full px-6 py-3 text-white focus:outline-none focus:border-purple-500"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 ml-2">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              className="w-full bg-gray-900 border border-gray-700 rounded-full px-6 py-3 pr-12 text-white focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 ml-2">Confirm Password</label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"}
              className="w-full bg-gray-900 border border-gray-700 rounded-full px-6 py-3 pr-12 text-white focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-full mt-6 shadow-lg shadow-purple-900/50"
        >
          Sign Up →
        </button>
      </form>
      
      <p className="mt-6 text-gray-500 text-sm">
        Already have an account? <span className="text-purple-400 font-bold cursor-pointer" onClick={() => navigate('/')}>Login</span>
      </p>
    </div>
  );
};

export default SignUp;

