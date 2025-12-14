import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Scene3D from '../components/Scene3D';
import { planets } from '../data/planets';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextPlanet = () => {
    setCurrentIndex((prev) => (prev + 1) % planets.length);
  };

  const prevPlanet = () => {
    setCurrentIndex((prev) => (prev - 1 + planets.length) % planets.length);
  };

  return (
    <div className="h-screen flex flex-col justify-between pt-10 pb-24 px-6 bg-black">
      
      {/* Header Text */}
      <div className="text-center z-10">
        <h2 className="text-gray-400 text-sm tracking-widest uppercase mb-1">STELLA</h2>
        <h1 className="text-2xl font-light text-white">The galaxy awaits you.</h1>
      </div>

      {/* 3D SCENE CONTAINER */}
      {/* We give it absolute positioning to fill the middle of the screen */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-full h-2/3">
           <Scene3D texturePath={planets[currentIndex].texture} />
        </div>
      </div>
      
      {/* UI Overlay (Name & Controls) */}
      <div className="z-10 flex flex-col items-center w-full">
        {/* Planet Name */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
            {planets[currentIndex].name}
          </h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            {planets[currentIndex].tagline}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full max-w-xs px-4">
          <button onClick={prevPlanet} className="p-3 rounded-full bg-gray-800/50 backdrop-blur-md hover:bg-purple-600 transition text-white">
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={() => navigate(`/planet/${planets[currentIndex].id}`)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold shadow-lg shadow-purple-900/50 hover:scale-105 transition text-white"
          >
            Explore planet
          </button>

          <button onClick={nextPlanet} className="p-3 rounded-full bg-gray-800/50 backdrop-blur-md hover:bg-purple-600 transition text-white">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;