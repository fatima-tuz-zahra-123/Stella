import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getPlanetById } from '../data/planets';
import Scene3D from '../components/Scene3D';

const PlanetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const planet = getPlanetById(id);

  if (!planet) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Planet not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
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
          <p className="text-sm text-gray-400 uppercase tracking-widest">{planet.tagline}</p>
        </div>
      </div>

      {/* Planet 3D View */}
      <div className="h-64 mb-6">
        <Scene3D texturePath={planet.texture} />
      </div>

      {/* Description */}
      <div className="px-6 mb-6">
        <p className="text-gray-300 leading-relaxed">{planet.description}</p>
      </div>

      {/* Surface Image Placeholder */}
      <div className="mx-6 mb-6 h-48 bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-2">🪐</p>
          <p className="text-sm">Surface Image</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <div className="space-y-3">
          {Object.entries(planet.stats).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400 capitalize">
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
          onClick={() => navigate('/galaxy')}
          className="w-full bg-purple-600 text-white font-bold py-4 rounded-full shadow-lg shadow-purple-900/50 hover:scale-105 transition"
        >
          Take a trip
        </button>
      </div>
    </div>
  );
};

export default PlanetDetails;

