import React from 'react';
import { FaHome, FaSearch, FaUser, FaCompass, FaNewspaper } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/useTheme';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  // Helper to determine if a tab is active
  const isActive = (path) => location.pathname === path;

  // Don't show navbar on auth screens and settings pages
  const hideNavbar = ['/', '/signup', '/splash', '/settings', '/password'].includes(location.pathname);
  if (hideNavbar) return null;

  return (
    <div className={`fixed bottom-0 w-full max-w-md backdrop-blur-md border-t flex justify-around py-4 z-50 ${isDark ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-gray-300'}`}>
      <NavItem 
        icon={<FaHome />} 
        active={isActive('/home')} 
        onClick={() => navigate('/home')}
        isDark={isDark}
      />
      <NavItem 
        icon={<FaSearch />} 
        active={isActive('/search')} 
        onClick={() => navigate('/search')}
        isDark={isDark}
      />
      <NavItem 
        icon={<FaCompass />} 
        active={isActive('/galaxy')} 
        onClick={() => navigate('/galaxy')}
        isDark={isDark}
      />
      <NavItem 
        icon={<FaNewspaper />} 
        active={isActive('/news')} 
        onClick={() => navigate('/news')}
        isDark={isDark}
      />
      <NavItem 
        icon={<FaUser />} 
        active={isActive('/profile')} 
        onClick={() => navigate('/profile')}
        isDark={isDark}
      />
    </div>
  );
};

const NavItem = ({ icon, active, onClick, isDark }) => (
  <button 
    onClick={onClick}
    className={`text-2xl transition-colors ${active ? 'text-purple-500' : isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}
  >
    {icon}
  </button>
);

export default Navbar;