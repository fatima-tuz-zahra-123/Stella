import React from 'react';
import { FaHome, FaSearch, FaUser, FaCompass, FaBookmark } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine if a tab is active
  const isActive = (path) => location.pathname === path;

  // Don't show navbar on auth screens
  const hideNavbar = ['/', '/signup', '/splash'].includes(location.pathname);
  if (hideNavbar) return null;

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-black/80 backdrop-blur-md border-t border-gray-800 flex justify-around py-4 z-50">
      <NavItem 
        icon={<FaHome />} 
        active={isActive('/home')} 
        onClick={() => navigate('/home')} 
      />
      <NavItem 
        icon={<FaSearch />} 
        active={isActive('/search')} 
        onClick={() => navigate('/search')} 
      />
      <NavItem 
        icon={<FaCompass />} 
        active={isActive('/galaxy')} 
        onClick={() => navigate('/galaxy')} 
      />
      <NavItem 
        icon={<FaBookmark />} 
        active={isActive('/news')} 
        onClick={() => navigate('/news')} 
      />
      <NavItem 
        icon={<FaUser />} 
        active={isActive('/profile')} 
        onClick={() => navigate('/profile')} 
      />
    </div>
  );
};

const NavItem = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`text-2xl transition-colors ${active ? 'text-purple-500' : 'text-gray-500 hover:text-white'}`}
  >
    {icon}
  </button>
);

export default Navbar;