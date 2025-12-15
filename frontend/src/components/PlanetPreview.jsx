import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const PlanetPreviewWithTexture = ({ texturePath, planetColor }) => {
  const meshRef = useRef();
  const texture = useTexture(texturePath);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        color={planetColor}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
};

const PlanetPreviewFallback = ({ planetColor }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={planetColor}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
};

const PlanetPreview = ({ texturePath, planetColor }) => {
  if (texturePath) {
    return (
      <Suspense fallback={<PlanetPreviewFallback planetColor={planetColor} />}>
        <PlanetPreviewWithTexture texturePath={texturePath} planetColor={planetColor} />
      </Suspense>
    );
  }
  
  return <PlanetPreviewFallback planetColor={planetColor} />;
};

const PlanetPreviewScene = ({ texturePath, planetColor }) => {
  return (
    <div style={{ width: '64px', height: '64px', position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 2, 2]} intensity={3.0} />
        <pointLight position={[-2, -2, -2]} intensity={0.3} />
        <PlanetPreview texturePath={texturePath} planetColor={planetColor} />
      </Canvas>
    </div>
  );
};

export default PlanetPreviewScene;

