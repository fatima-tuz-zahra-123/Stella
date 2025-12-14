import React, { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useBounds } from "@react-three/drei"; 

const Planet3DWithTexture = ({ texturePath, planetColor }) => {
  const meshRef = useRef();
  const bounds = useBounds();
  const colorMap = useTexture(texturePath);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      castShadow 
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        bounds.refresh(e.object).fit(); 
      }}
    >
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap}
        color={planetColor}
        roughness={0.7} 
        metalness={0.1}
      />
    </mesh>
  );
};

const Planet3DFallback = ({ planetColor }) => {
  const meshRef = useRef();
  const bounds = useBounds();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      castShadow 
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        bounds.refresh(e.object).fit(); 
      }}
    >
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial 
        color={planetColor}
        roughness={0.7} 
        metalness={0.1}
      />
    </mesh>
  );
};

const Planet3D = ({ texturePath, planetColor }) => {
  if (texturePath) {
    return (
      <Suspense fallback={<Planet3DFallback planetColor={planetColor} />}>
        <Planet3DWithTexture texturePath={texturePath} planetColor={planetColor} />
      </Suspense>
    );
  }
  
  return <Planet3DFallback planetColor={planetColor} />;
};

export default Planet3D;
