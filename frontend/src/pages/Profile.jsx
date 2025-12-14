import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaKey, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/useTheme';

const Profile = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogout = () => {
    navigate('/');
  };

  const menuItems = [
    { icon: <FaCog />, label: 'Settings', onClick: () => navigate('/settings') },
    { icon: <FaKey />, label: 'Password', onClick: () => navigate('/password') },
    { icon: <FaSignOutAlt />, label: 'Log out', onClick: handleLogout, danger: true },
  ];

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>PROFILE</h1>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center py-8">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">👤</span>
        </div>
        <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Murphy</h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>@murphyslaw</p>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-full rounded-lg p-4 flex items-center justify-between transition ${
              item.danger ? 'border border-red-500' : ''
            } ${isDark ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
          >
            <div className="flex items-center gap-4">
              <span className={item.danger ? 'text-red-500' : isDark ? 'text-white' : 'text-black'}>
                {item.icon}
              </span>
              <span className={`font-semibold ${item.danger ? 'text-red-500' : isDark ? 'text-white' : 'text-black'}`}>
                {item.label}
              </span>
            </div>
            <FaChevronRight className={item.danger ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile;

