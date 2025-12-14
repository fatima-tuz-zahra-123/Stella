import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/useTheme';
import { planets } from '../data/planets';
import PlanetPreviewScene from '../components/PlanetPreview';

const Search = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlanets = planets.filter(
    (planet) =>
      planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planet.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">SEARCH</h1>
      </div>

      {/* Search Input */}
      <div className="px-6 mb-6 relative">
        <FaSearch className={`absolute left-10 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        <input
          type="text"
          placeholder="Search planets in our solar system"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full border rounded-full px-12 py-3 focus:outline-none focus:border-purple-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
        />
      </div>

      {/* Search Results */}
      <div className="px-6 space-y-3">
        {filteredPlanets.map((planet) => (
          <div
            key={planet.id}
            onClick={() => navigate(`/planet/${planet.id}`)}
            className={`rounded-lg p-4 flex items-center gap-4 cursor-pointer transition ${isDark ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
          >
            {/* 3D Planet Preview - Floating Cutout */}
            <div className="w-16 h-16 flex-shrink-0 relative" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
              <PlanetPreviewScene texturePath={planet.texture} planetColor={planet.color} />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-black'}`}>{planet.name}</h3>
              <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {planet.tagline}
              </p>
            </div>
            <FaChevronRight className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

