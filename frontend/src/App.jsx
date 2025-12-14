import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { useTheme } from './context/useTheme';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Splash from './pages/Splash';
import Home from './pages/Home';
import PlanetDetails from './pages/PlanetDetails';
import Galaxy from './pages/Galaxy';
import News from './pages/News';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PasswordChange from './pages/PasswordChange';
import Navbar from './components/Navbar';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen font-sans max-w-md mx-auto overflow-hidden shadow-2xl border-x ${isDark ? 'bg-black text-white border-gray-800' : 'bg-gray-50 text-black border-gray-200'} relative`}>
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/planet/:id" element={<PlanetDetails />} />
        <Route path="/galaxy" element={<Galaxy />} />
        <Route path="/news" element={<News />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/password" element={<PasswordChange />} />
      </Routes>
      {/* Bottom Navigation matches your design */}
      <Navbar />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

