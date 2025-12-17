import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Bounds } from "@react-three/drei"; // <--- Import Bounds
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import Planet3D from "./Planet3D";

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-3"></div>
      <p className="text-white text-sm">Loading 3D Model...</p>
    </div>
  </div>
);

const Scene3D = ({ texturePath, planetColor }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && <LoadingSpinner />}
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        style={{ background: '#000000' }}
        onCreated={() => {
          // Give a small delay to ensure textures start loading
          setTimeout(() => setIsLoading(false), 500);
        }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" />
        <directionalLight castShadow position={[5, 3, 5]} intensity={3} shadow-mapSize={[1024, 1024]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        {/* 1. Add makeDefault to OrbitControls so Bounds can control it */}
        <OrbitControls makeDefault enableZoom={true} enablePan={false} minDistance={3} maxDistance={20} />

        <Suspense fallback={null}>
          {/* 2. Wrap the Planet in Bounds. "margin" controls how close the zoom gets (1.2 = 20% padding) */}
          <Bounds fit clip observe margin={1.5}>
             <Planet3D texturePath={texturePath} planetColor={planetColor} />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;