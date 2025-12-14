import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Splash from './pages/Splash';
import Home from './pages/Home';
import PlanetDetails from './pages/PlanetDetails';
import Galaxy from './pages/Galaxy';
import News from './pages/News';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans max-w-md mx-auto overflow-hidden shadow-2xl border-x border-gray-800 relative">
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
        </Routes>
        {/* Bottom Navigation matches your design */}
        <Navbar />
      </div>
    </Router>
  );
}

export default App;