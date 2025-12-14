import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/useTheme';
import { getPlanetById } from '../data/planets';
import Scene3D from '../components/Scene3D';

const PlanetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const planet = getPlanetById(id);

  if (!planet) {
    return (
      <div className={`h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
        <p>Planet not found</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className="flex items-center p-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-800 rounded-full transition"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-widest">{planet.name}</h1>
          <p className={`text-sm uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{planet.tagline}</p>
        </div>
      </div>

      {/* Planet 3D View - Always dark background */}
      <div className="h-64 mb-6 bg-black">
        <Scene3D texturePath={planet.texture} planetColor={planet.color} />
      </div>

      {/* Description */}
      <div className="px-6 mb-6">
        <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{planet.description}</p>
      </div>

      {/* Surface Image - Texture Map */}
      <div className="mx-6 mb-6 h-48 rounded-lg overflow-hidden bg-black">
        {planet.texture ? (
          <img 
            src={planet.texture} 
            alt={`${planet.name} surface`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full flex items-center justify-center ${planet.texture ? 'hidden' : ''}`}
          style={{ backgroundColor: planet.color }}
        >
          <div className={`text-center ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            <p className="text-4xl mb-2">🪐</p>
            <p className="text-sm">Surface Image</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <div className="space-y-3">
          {Object.entries(planet.stats).map(([key, value]) => (
            <div key={key} className={`flex justify-between py-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
              <span className={`capitalize ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-semibold">
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Take a Trip Button */}
      <div className="px-6">
        <button
          onClick={() => navigate(`/galaxy?planetId=${planet.id}`)}
          className="w-full bg-purple-600 text-white font-bold py-4 rounded-full shadow-lg shadow-purple-900/50 hover:scale-105 transition"
        >
          Take a trip
        </button>
      </div>
    </div>
  );
};

export default PlanetDetails;

