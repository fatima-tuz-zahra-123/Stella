import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useBounds } from "@react-three/drei"; 

const Planet3D = ({ texturePath }) => {
  const meshRef = useRef();
  const bounds = useBounds(); 

  // 1. THIS IS THE FIX: We removed the comment slashes and the try/catch block.
  // It will now try to load the image. If the image is missing, the app will freeze (Suspense).
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
      {/* 2. Map the texture to the material */}
      <meshStandardMaterial 
        map={colorMap} 
        roughness={0.7} 
        metalness={0.1}
      />
    </mesh>
  );
};

export default Planet3D;