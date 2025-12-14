import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Stars } from '@react-three/drei';
import { planets } from '../data/planets';
import * as THREE from 'three';

// Orbital distances - scaled closer together so all planets fit in view
// Maintaining relative proportions but compressed for better visualization
const orbitalDistances = {
  1: 1.5,   // Mercury
  2: 2.0,   // Venus
  3: 2.5,   // Earth
  4: 3.0,   // Mars
  5: 4.5,   // Jupiter
  6: 6.0,   // Saturn
  7: 7.5,   // Uranus
  9: 8.5,   // Neptune
  8: 9.5,   // Pluto
};

// Orbital speeds (revolutions per second, scaled)
const orbitalSpeeds = {
  1: 0.02,  // Mercury (fastest)
  2: 0.015,
  3: 0.01,
  4: 0.008,
  5: 0.003,
  6: 0.002,
  7: 0.001,
  9: 0.0008, // Neptune
  8: 0.0005, // Pluto (slowest)
};

const Sun = () => {
  const sunTexture = useTexture('/textures/8k_sun.jpg');

  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        map={sunTexture}
        color="#FFD700"
        emissive="#FFA500"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const EarthPlanet = ({ distance, speed, time, size }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const dayTexture = useTexture('/textures/8k_earth_daymap.jpg');
  const nightTexture = useTexture('/textures/8k_earth_nightmap.jpg');

  useFrame(() => {
    const angle = time * speed * Math.PI * 2;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
    if (groupRef.current) {
      groupRef.current.position.x = x;
      groupRef.current.position.z = z;
    }
  });

  const initialAngle = time * speed * Math.PI * 2;
  const initialX = Math.cos(initialAngle) * distance;
  const initialZ = Math.sin(initialAngle) * distance;

  return (
    <group ref={groupRef} position={[initialX, 0, initialZ]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={dayTexture}
          emissiveMap={nightTexture}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0.3}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

const SaturnRings = ({ size }) => {
  const ringTexture = useTexture('/textures/8k_saturn_ring_alpha.png');

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[size * 1.2, size * 2, 64]} />
      <meshBasicMaterial
        map={ringTexture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const PlanetWithTexture = ({ planet, distance, speed, time }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const texture = useTexture(planet.texture);

  useFrame(() => {
    const angle = time * speed * Math.PI * 2;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
    if (groupRef.current) {
      groupRef.current.position.x = x;
      groupRef.current.position.z = z;
    }
  });

  const size = planet.id <= 4 ? 0.15 : planet.id === 5 ? 0.4 : planet.id === 6 ? 0.35 : planet.id === 7 || planet.id === 9 ? 0.25 : 0.1;

  const initialAngle = time * speed * Math.PI * 2;
  const initialX = Math.cos(initialAngle) * distance;
  const initialZ = Math.sin(initialAngle) * distance;

  return (
    <group ref={groupRef} position={[initialX, 0, initialZ]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          color={planet.color}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {planet.id === 6 && (
        <Suspense fallback={null}>
          <SaturnRings size={size} />
        </Suspense>
      )}
    </group>
  );
};

const PlanetFallback = ({ planet, distance, speed, time }) => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame(() => {
    const angle = time * speed * Math.PI * 2;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
    if (groupRef.current) {
      groupRef.current.position.x = x;
      groupRef.current.position.z = z;
    }
  });

  const size = planet.id <= 4 ? 0.15 : planet.id === 5 ? 0.4 : planet.id === 6 ? 0.35 : planet.id === 7 || planet.id === 9 ? 0.25 : 0.1;

  const initialAngle = time * speed * Math.PI * 2;
  const initialX = Math.cos(initialAngle) * distance;
  const initialZ = Math.sin(initialAngle) * distance;

  return (
    <group ref={groupRef} position={[initialX, 0, initialZ]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

const Planet = ({ planet, distance, speed, time }) => {
  const hasTexture = planet.texture !== null && planet.texture !== undefined;
  
  if (planet.id === 3) {
    // Earth with day/night maps
    const size = 0.15;
    return (
      <Suspense fallback={<PlanetFallback planet={planet} distance={distance} speed={speed} time={time} />}>
        <EarthPlanet distance={distance} speed={speed} time={time} size={size} />
      </Suspense>
    );
  }
  
  if (hasTexture) {
    return (
      <Suspense fallback={<PlanetFallback planet={planet} distance={distance} speed={speed} time={time} />}>
        <PlanetWithTexture planet={planet} distance={distance} speed={speed} time={time} />
      </Suspense>
    );
  }
  
  return <PlanetFallback planet={planet} distance={distance} speed={speed} time={time} />;
};

// Orbital ring component - centered at sun
const OrbitalRing = ({ distance, showOrbits }) => {
  if (!showOrbits) return null;
  
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <ringGeometry args={[distance - 0.01, distance + 0.01, 128]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
};

const SolarSystem = ({ time, zoom, showOrbits, speedMultiplier = 1 }) => {
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* Point light at sun center for realistic shading */}
      <pointLight position={[0, 0, 0]} intensity={9} color="#FFD700" distance={50} decay={2} />
      <Stars radius={200} depth={100} count={5000} fade />
      
      <Suspense fallback={null}>
        <Sun />
      </Suspense>
      
      {/* Orbital rings centered at sun */}
      {planets.map((planet) => (
        <OrbitalRing
          key={`orbit-${planet.id}`}
          distance={orbitalDistances[planet.id] * zoom}
          showOrbits={showOrbits}
        />
      ))}
      
      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          distance={orbitalDistances[planet.id] * zoom}
          speed={orbitalSpeeds[planet.id] * speedMultiplier}
          time={time}
          showOrbits={showOrbits}
        />
      ))}
    </>
  );
};

export default SolarSystem;
