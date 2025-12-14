import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../context/useTheme';

const PasswordChange = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    // Simulate password change
    setSuccess(true);
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className={`flex items-center p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-800 rounded-full transition"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Change Password</h1>
      </div>

      {/* Form */}
      <div className="p-6">
        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg">
            <p className="text-green-400 font-semibold">Password changed successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`text-xs ml-2 mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full border rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className={`text-xs ml-2 mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full border rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className={`text-xs ml-2 mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                placeholder="Confirm new password"
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
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-full mt-6 shadow-lg shadow-purple-900/50 hover:bg-purple-700 hover:scale-[1.02] transition-all duration-200"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;

