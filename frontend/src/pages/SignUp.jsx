import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../context/useTheme';

const SignUp = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(pwd)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(pwd)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(pwd)) errors.push('One number');
    if (!/[!@#$%^&*]/.test(pwd)) errors.push('One special character (!@#$%^&*)');
    return errors;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username || username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(', ');
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      navigate('/home');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={`h-screen flex flex-col items-center justify-center px-8 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="mb-12 relative">
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-2xl absolute -top-4 -left-4"></div>
        <img src="/6400117.png" alt="Stella Logo" className="w-32 h-32 relative z-10" />
      </div>

      <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>STELLA</h1>
      <h2 className={`text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Create Account</h2>

      <form className="w-full space-y-4" onSubmit={handleSignUp}>
        <div>
          <label className={`text-xs ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Username</label>
          <input 
            type="text" 
            className={`w-full border ${errors.username ? 'border-red-500' : isDark ? 'border-gray-700' : 'border-gray-300'} rounded-full px-6 py-3 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors({...errors, username: ''});
            }}
          />
          {errors.username && <p className="text-red-400 text-xs mt-1 ml-2">{errors.username}</p>}
        </div>
        <div>
          <label className={`text-xs ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              className={`w-full border ${errors.password ? 'border-red-500' : isDark ? 'border-gray-700' : 'border-gray-300'} rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({...errors, password: ''});
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1 ml-2">{errors.password}</p>}
          {!errors.password && password && (
            <p className="text-gray-500 text-xs mt-1 ml-2">
              Must contain: 8+ chars, uppercase, lowercase, number, special char
            </p>
          )}
        </div>
        <div>
          <label className={`text-xs ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Confirm Password</label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full border ${errors.confirmPassword ? 'border-red-500' : isDark ? 'border-gray-700' : 'border-gray-300'} rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-2">{errors.confirmPassword}</p>}
        </div>

        <button 
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-full mt-6 shadow-lg shadow-purple-900/50 hover:bg-purple-700 hover:scale-[1.02] transition-all duration-200"
        >
          Sign Up →
        </button>
      </form>
      
      <p className={`mt-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
        Already have an account? <span className="text-purple-400 font-bold cursor-pointer" onClick={() => navigate('/')}>Login</span>
      </p>
    </div>
  );
};

export default SignUp;

