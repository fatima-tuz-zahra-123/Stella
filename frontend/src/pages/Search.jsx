import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaChevronRight } from 'react-icons/fa';
import { planets } from '../data/planets';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlanets = planets.filter(
    (planet) =>
      planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planet.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">SEARCH</h1>
      </div>

      {/* Search Input */}
      <div className="px-6 mb-6 relative">
        <FaSearch className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Planets in our solar system"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-full px-12 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Planet List */}
      <div className="px-6 space-y-3">
        {filteredPlanets.map((planet) => (
          <div
            key={planet.id}
            onClick={() => navigate(`/planet/${planet.id}`)}
            className="bg-gray-900 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-800 transition"
          >
            <div
              className="w-12 h-12 rounded-full flex-shrink-0"
              style={{ backgroundColor: planet.color }}
            ></div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{planet.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{planet.tagline}</p>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

