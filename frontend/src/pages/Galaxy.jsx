import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { FaPlus, FaMinus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import * as THREE from 'three';
import { useTheme } from '../context/useTheme';
import SolarSystem from '../components/SolarSystem';
import { useLocation } from 'react-router-dom';
import { planets } from '../data/planets';

// Helper function to format planet name (capitalize first letter, lowercase rest)
const formatPlanetName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// Entities list: Sun first, then planets in order (Mercury to Pluto)
// Order: Sun, Mercury(1), Venus(2), Earth(3), Mars(4), Jupiter(5), Saturn(6), Uranus(7), Neptune(9), Pluto(8)
const planetOrder = [1, 2, 3, 4, 5, 6, 7, 9, 8]; // Custom order to match orbital sequence
const sortedPlanets = planetOrder.map(id => planets.find(p => p.id === id)).filter(Boolean);
const entities = [
  { type: 'sun', name: 'Sun', id: 0 },
  ...sortedPlanets.map(p => ({ type: 'planet', name: formatPlanetName(p.name), id: p.id }))
];

const Galaxy = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const [zoom] = useState(1); // Used for scaling orbital distances in SolarSystem
  const [time, setTime] = useState(0);
  const [showOrbits, setShowOrbits] = useState(true);
  const [speed, setSpeed] = useState(1); // Speed multiplier
  const [focusedEntityIndex, setFocusedEntityIndex] = useState(0); // 0 = Sun, 1-9 = planets
  const timeRef = useRef(0);
  const orbitControlsRef = useRef();
  const previousSpeedRef = useRef(1);

  // Initially focus on Sun
  React.useEffect(() => {
    if (orbitControlsRef.current) {
      focusOnEntity(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animation loop for orbital motion
  // Preserve position when speed changes by adjusting time offset
  React.useEffect(() => {
    if (previousSpeedRef.current !== speed) {
      // When speed changes, adjust time to preserve current positions
      // This ensures planets don't jump when speed changes
      const speedRatio = previousSpeedRef.current / speed;
      timeRef.current = timeRef.current * speedRatio;
      previousSpeedRef.current = speed;
    }
    
    const interval = setInterval(() => {
      timeRef.current += 0.01 * speed;
      setTime(timeRef.current);
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [speed]);

  // Position camera at planet if planetId is in URL (e.g., from "Take a trip")
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planetId = params.get('planetId');

    if (!planetId) return;

    const targetIndex = planets.findIndex(p => p.id === parseInt(planetId, 10));
    if (targetIndex === -1) return;

    let attempts = 0;
    const maxAttempts = 30;

    const tryFocus = () => {
      const controls = orbitControlsRef.current;
      if (!controls) return false;
      const entityIndex = targetIndex + 1; // Sun is 0
      setFocusedEntityIndex(entityIndex);
      focusOnEntity(entityIndex, { forceMinDistance: true });
      return true;
    };

    if (!tryFocus()) {
      const interval = setInterval(() => {
        attempts += 1;
        if (tryFocus() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleZoomIn = () => {
    if (orbitControlsRef.current) {
      // Zoom in by moving camera closer to target
      const camera = orbitControlsRef.current.object;
      const target = orbitControlsRef.current.target;
      const direction = new THREE.Vector3().subVectors(camera.position, target).normalize();
      const zoomAmount = 0.5;
      const newPosition = camera.position.clone().add(direction.multiplyScalar(-zoomAmount));
      
      // Check if new distance is within limits
      const newDistance = newPosition.distanceTo(target);
      if (newDistance >= 3) {
        camera.position.copy(newPosition);
        orbitControlsRef.current.update();
      }
    }
  };

  const handleZoomOut = () => {
    if (orbitControlsRef.current) {
      // Zoom out by moving camera away from target
      const camera = orbitControlsRef.current.object;
      const target = orbitControlsRef.current.target;
      const direction = new THREE.Vector3().subVectors(camera.position, target).normalize();
      const zoomAmount = 0.5;
      const newPosition = camera.position.clone().add(direction.multiplyScalar(zoomAmount));
      
      // Check if new distance is within limits
      const newDistance = newPosition.distanceTo(target);
      if (newDistance <= 50) {
        camera.position.copy(newPosition);
        orbitControlsRef.current.update();
      }
    }
  };

  // Focus camera on entity
  const focusOnEntity = (entityIndex, options = {}) => {
    if (!orbitControlsRef.current) return;
    if (entityIndex < 0 || entityIndex >= entities.length) return;
    const { forceMinDistance = false } = options;
    
    const entity = entities[entityIndex];
    const orbitalDistances = {
      1: 1.5, 2: 2.0, 3: 2.5, 4: 3.0, 5: 4.5, 6: 6.0, 7: 7.5, 9: 8.5, 8: 9.5
    };
    const planetSpeeds = {
      1: 0.02, 2: 0.015, 3: 0.01, 4: 0.008, 5: 0.003, 6: 0.002, 7: 0.001, 9: 0.0008, 8: 0.0005
    };

    // Get current camera position and target to preserve distance and angle
    const currentTarget = orbitControlsRef.current.target.clone();
    const currentPosition = orbitControlsRef.current.object.position.clone();
    const currentDistance = currentPosition.distanceTo(currentTarget);
    
    // Preserve distance if it's valid (between min and max zoom limits)
    const minDistance = orbitControlsRef.current.minDistance || 3;
    const preservedDistanceRaw = currentDistance >= 3 && currentDistance <= 50 ? currentDistance : (entity.type === 'sun' ? 8 : 2);
    const preservedDistance = forceMinDistance ? minDistance : preservedDistanceRaw;
    
    // Calculate direction from current position to current target to preserve camera angle
    const currentDirection = new THREE.Vector3().subVectors(currentPosition, currentTarget).normalize();

    if (entity.type === 'sun') {
      // Focus on sun - set target to sun position
      const newTarget = new THREE.Vector3(0, 0, 0);
      orbitControlsRef.current.target.copy(newTarget);
      
      // Position camera at preserved distance, maintaining relative angle
      const newPosition = newTarget.clone().add(currentDirection.multiplyScalar(preservedDistance));
      // Preserve Y position if reasonable, otherwise use default
      newPosition.y = currentPosition.y >= 0 && currentPosition.y <= 10 ? currentPosition.y : 3;
      orbitControlsRef.current.object.position.copy(newPosition);
      orbitControlsRef.current.update();
    } else {
      // Focus on planet - account for speed multiplier to match actual planet position
      const planet = planets.find(p => p.id === entity.id);
      if (planet) {
        const distance = orbitalDistances[planet.id] || 3;
        // Match SolarSystem calculation: time * (orbitalSpeeds[planet.id] * speedMultiplier)
        // Since time already accumulates with speed, we use: time * planetSpeeds[planet.id] * speed
        const angle = time * (planetSpeeds[planet.id] || 0.01) * speed * Math.PI * 2;
        const planetX = Math.cos(angle) * distance;
        const planetZ = Math.sin(angle) * distance;
        
        // Set target to planet position
        const newTarget = new THREE.Vector3(planetX, 0, planetZ);
        orbitControlsRef.current.target.copy(newTarget);
        
        // Position camera at preserved distance, maintaining relative angle
        const newPosition = newTarget.clone().add(currentDirection.multiplyScalar(preservedDistance));
        // Preserve Y position if reasonable
        newPosition.y = currentPosition.y >= 0 && currentPosition.y <= 10 ? currentPosition.y : 1;
        orbitControlsRef.current.object.position.copy(newPosition);
        orbitControlsRef.current.update();
      }
    }
  };

  // Switch to previous entity
  const handlePreviousEntity = () => {
    const newIndex = focusedEntityIndex > 0 ? focusedEntityIndex - 1 : entities.length - 1;
    setFocusedEntityIndex(newIndex);
    // Use setTimeout to ensure state update completes before focusing
    setTimeout(() => {
      focusOnEntity(newIndex);
    }, 0);
  };

  // Switch to next entity
  const handleNextEntity = () => {
    const newIndex = focusedEntityIndex < entities.length - 1 ? focusedEntityIndex + 1 : 0;
    setFocusedEntityIndex(newIndex);
    // Use setTimeout to ensure state update completes before focusing
    setTimeout(() => {
      focusOnEntity(newIndex);
    }, 0);
  };

  // Update camera position when focused entity moves (for planets)
  React.useEffect(() => {
    if (focusedEntityIndex > 0 && orbitControlsRef.current) {
      // If focusing on a planet, update its position as it orbits
      const entity = entities[focusedEntityIndex];
      if (entity && entity.type === 'planet') {
        const planet = planets.find(p => p.id === entity.id);
        if (planet) {
          const orbitalDistances = {
            1: 1.5, 2: 2.0, 3: 2.5, 4: 3.0, 5: 4.5, 6: 6.0, 7: 7.5, 9: 8.5, 8: 9.5
          };
          const planetSpeeds = {
            1: 0.02, 2: 0.015, 3: 0.01, 4: 0.008, 5: 0.003, 6: 0.002, 7: 0.001, 9: 0.0008, 8: 0.0005
          };
          const distance = orbitalDistances[planet.id] || 3;
          // Match SolarSystem calculation: time * (orbitalSpeeds[planet.id] * speedMultiplier)
          // Since time already accumulates with speed, we use: time * planetSpeeds[planet.id] * speed
          const angle = time * (planetSpeeds[planet.id] || 0.01) * speed * Math.PI * 2;
          const planetX = Math.cos(angle) * distance;
          const planetZ = Math.sin(angle) * distance;
          
          // Get current camera position and target to preserve distance and angle
          const currentTarget = orbitControlsRef.current.target.clone();
          const currentPosition = orbitControlsRef.current.object.position.clone();
          const currentDistance = currentPosition.distanceTo(currentTarget);
          
          // Preserve distance if valid
          const preservedDistance = currentDistance >= 3 && currentDistance <= 50 ? currentDistance : 2;
          
          // Calculate direction from current position to current target to preserve camera angle
          const currentDirection = new THREE.Vector3().subVectors(currentPosition, currentTarget).normalize();
          
          // Update target to planet's new position
          const newTarget = new THREE.Vector3(planetX, 0, planetZ);
          orbitControlsRef.current.target.copy(newTarget);
          
          // Maintain camera distance and angle relative to planet
          const newPosition = newTarget.clone().add(currentDirection.multiplyScalar(preservedDistance));
          // Preserve Y position
          newPosition.y = currentPosition.y;
          orbitControlsRef.current.object.position.copy(newPosition);
          orbitControlsRef.current.update();
        }
      }
    }
  }, [time, focusedEntityIndex, speed]);

  const speedOptions = [0.5, 1, 2, 4, 8];
  const currentSpeedIndex = speedOptions.indexOf(speed);
  
  const handleSpeedDecrease = () => {
    if (currentSpeedIndex > 0) {
      setSpeed(speedOptions[currentSpeedIndex - 1]);
    }
  };

  const handleSpeedIncrease = () => {
    if (currentSpeedIndex < speedOptions.length - 1) {
      setSpeed(speedOptions[currentSpeedIndex + 1]);
    }
  };


  return (
    <div className={`h-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'} relative overflow-hidden`}>
      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
        {/* Orbit Toggle */}
        <button
          onClick={() => setShowOrbits(!showOrbits)}
          className="px-4 py-2 rounded-lg bg-gray-900/80 backdrop-blur-md text-sm font-semibold hover:bg-purple-600 transition text-white"
        >
          {showOrbits ? 'Hide Orbits' : 'Show Orbits'}
        </button>
        
        {/* Speed Control - Current value with arrow buttons */}
        <div className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-md rounded-lg p-2">
          <button
            onClick={handleSpeedDecrease}
            disabled={currentSpeedIndex === 0}
            className={`p-1 rounded transition ${
              currentSpeedIndex === 0
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-white hover:bg-gray-700'
            }`}
            aria-label="Decrease speed"
          >
            <FaArrowLeft />
          </button>
          <span className="px-3 py-1 text-sm font-semibold text-white min-w-[3rem] text-center">
            {speed}x
          </span>
          <button
            onClick={handleSpeedIncrease}
            disabled={currentSpeedIndex === speedOptions.length - 1}
            className={`p-1 rounded transition ${
              currentSpeedIndex === speedOptions.length - 1
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-white hover:bg-gray-700'
            }`}
            aria-label="Increase speed"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* 3D Solar System Canvas - Always dark background */}
      <div className="absolute inset-0 bg-black">
        <Canvas
          camera={{ position: [0, 3, 8], fov: 50 }}
          onCreated={({ camera }) => {
            // Initially point camera at sun
            camera.lookAt(0, 0, 0);
          }}
        >
          <ambientLight intensity={0.1} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>

          <OrbitControls
            ref={orbitControlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={50}
            autoRotate={false}
          />

          <SolarSystem time={time} zoom={zoom} showOrbits={showOrbits} speedMultiplier={speed} />
        </Canvas>
      </div>

      {/* Zoom Controls - Bottom Left */}
      <div className="absolute bottom-24 left-6 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition shadow-lg text-white"
          aria-label="Zoom in"
        >
          <FaPlus />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-12 h-12 bg-gray-900/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-purple-600 transition shadow-lg text-white"
          aria-label="Zoom out"
        >
          <FaMinus />
        </button>
      </div>

      {/* Entity Focus Controls - Bottom Right */}
      <div className="absolute bottom-24 right-6 z-10">
        <div className="flex items-center gap-3 bg-gray-900/80 backdrop-blur-md rounded-lg px-4 py-3">
          <button
            onClick={handlePreviousEntity}
            className="p-2 rounded transition text-white hover:bg-gray-700"
            aria-label="Previous entity"
          >
            <FaArrowLeft />
          </button>
          <span className="px-4 py-2 text-base font-semibold text-white min-w-[8rem] text-center">
            {entities[focusedEntityIndex]?.name || 'Sun'}
          </span>
          <button
            onClick={handleNextEntity}
            className="p-2 rounded transition text-white hover:bg-gray-700"
            aria-label="Next entity"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>


    </div>
  );
};

export default Galaxy;
