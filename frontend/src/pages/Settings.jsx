import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/useTheme';

const Settings = () => {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className="flex items-center p-6 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-800 rounded-full transition"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="p-6 space-y-6">
        {/* Theme Toggle */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isDark ? (
                <FaMoon className="text-2xl text-purple-400" />
              ) : (
                <FaSun className="text-2xl text-yellow-500" />
              )}
              <div>
                <h3 className="font-bold text-lg">Theme</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDark}
                onChange={toggleTheme}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">Notifications</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage notification settings
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={true}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
          <h3 className="font-bold text-lg mb-2">About</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            STELLA v1.0.0 - The Universe, Pocket-Sized
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

