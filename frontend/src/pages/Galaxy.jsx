import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from 'react-icons/fa';

const Galaxy = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <h1 className="text-2xl font-bold">Galaxy</h1>
      </div>

      {/* 3D Canvas Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-96 h-96 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 opacity-50 blur-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">
              <p className="text-6xl mb-4">🌌</p>
              <p className="text-sm">3D Galaxy View</p>
              <p className="text-xs text-gray-500 mt-2">Interactive Solar System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Pad */}
      <div className="absolute bottom-24 right-6 flex gap-4 z-10">
        {/* Zoom Controls */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition"
            aria-label="Zoom in"
          >
            <FaPlus />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition"
            aria-label="Zoom out"
          >
            <FaMinus />
          </button>
        </div>

        {/* Directional Controls */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <button
              className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition"
              aria-label="Move up"
            >
              <FaChevronUp />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition"
              aria-label="Rotate left"
            >
              <FaChevronLeft />
            </button>
            <div className="w-12"></div>
            <button
              className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition"
              aria-label="Rotate right"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition"
              aria-label="Move down"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Planet Info */}
      {selectedPlanet && (
        <div className="absolute top-24 left-6 bg-gray-900/80 backdrop-blur-md p-4 rounded-lg">
          <p className="text-sm font-semibold">Selected: {selectedPlanet}</p>
        </div>
      )}
    </div>
  );
};

export default Galaxy;

