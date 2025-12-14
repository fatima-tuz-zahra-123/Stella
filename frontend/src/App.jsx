import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
// import PlanetDetail from './pages/PlanetDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans max-w-md mx-auto overflow-hidden shadow-2xl border-x border-gray-800 relative">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/planet/:id" element={<PlanetDetail />} /> */}
        </Routes>
        {/* Bottom Navigation matches your design */}
        <Navbar />
      </div>
    </Router>
  );
}

export default App;