'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Modern Luxury Villa 3D Model
function HouseModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Villa Structure - Modern Box Design */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 5]} />
        <meshStandardMaterial
          color="#E8E4D9"
          roughness={0.4}
          metalness={0.05}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Glass Facade - Large Windows */}
      <mesh position={[0, 2, 2.51]} castShadow>
        <boxGeometry args={[5, 3, 0.1]} />
        <meshStandardMaterial
          color="#2A4858"
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Balcony */}
      <mesh position={[0, 3.5, 3]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial color="#D4CFC0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Balcony Railing */}
      <mesh position={[0, 4, 3.5]} castShadow>
        <boxGeometry args={[4, 0.6, 0.05]} />
        <meshStandardMaterial color="#8B7355" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Entrance Canopy */}
      <mesh position={[0, 1.5, 3.5]} castShadow>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#3A3A3A" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Side Wing - Modern Extension */}
      <mesh position={[4, 1.5, -1]} castShadow receiveShadow>
        <boxGeometry args={[2, 3, 3]} />
        <meshStandardMaterial color="#D8D4C8" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Side Wing Window */}
      <mesh position={[5.01, 1.5, -1]} castShadow>
        <boxGeometry args={[0.1, 2, 2]} />
        <meshStandardMaterial
          color="#2A4858"
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Foundation/Base */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[7, 0.3, 6]} />
        <meshStandardMaterial color="#5A5A5A" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Pool/Water Feature */}
      <mesh position={[-2, -0.15, 4]} receiveShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial
          color="#4A9FB8"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Landscaping - Stone Path */}
      <mesh position={[0, -0.2, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#7A8B7A" roughness={0.9} />
      </mesh>

      {/* Accent Lighting Fixtures */}
      <pointLight position={[0, 5, 3]} intensity={0.3} color="#FFA500" distance={10} />
      <pointLight position={[4, 3, -1]} intensity={0.2} color="#FFA500" distance={8} />
    </group>
  )
}

function Scene() {
  return (
    <>
      {/* Improved Lighting for Realism */}
      <ambientLight intensity={0.3} color="#ffffff" />

      {/* Main Sun Light */}
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#FFF5E1"
      />

      {/* Fill Light */}
      <directionalLight position={[-10, 10, -5]} intensity={0.4} color="#87CEEB" />

      {/* Accent Rim Light */}
      <spotLight position={[-15, 15, -10]} intensity={0.6} angle={0.4} penumbra={1} color="#FFE4B5" />

      {/* House Model */}
      <HouseModel />

      {/* Camera and Controls */}
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />
      <OrbitControls
        enablePan={typeof window !== 'undefined' && window.innerWidth > 768}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

export function House3DViewer() {
  return (
    <section className="py-32 bg-luxury-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="inline-block px-5 py-2 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-6"
          >
            Architectural Context
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-display font-display font-light text-luxury-off-white mb-6"
          >
            Spatial <span className="text-gradient-gold">Understanding</span>
          </motion.h2>
        </div>

        {/* 3D Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="relative"
        >
          <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-luxury-off-white/5 bg-gradient-to-b from-luxury-slate to-luxury-charcoal relative md:touch-auto touch-pan-y">
            <Canvas shadows className="md:pointer-events-auto pointer-events-none">
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>

            {/* Touch instructions for mobile */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden glass-dark px-6 py-3 rounded-full text-luxury-off-white/80 text-xs backdrop-blur-xl pointer-events-none">
              Touch and drag to rotate • Pinch to zoom
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
