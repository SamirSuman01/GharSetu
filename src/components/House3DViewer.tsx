'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Simple 3D House Model Component
function HouseModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main House Body */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <coneGeometry args={[3.2, 1.5, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.75, 2.01]} castShadow>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Windows */}
      {/* Front windows */}
      <mesh position={[-1, 1.5, 2.01]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[1, 1.5, 2.01]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Side windows */}
      <mesh position={[2.01, 1.5, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-2.01, 1.5, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Chimney */}
      <mesh position={[1.2, 4, 1]} castShadow>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Base/Foundation */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[4.5, 0.2, 4.5]} />
        <meshStandardMaterial color="#696969" roughness={0.9} />
      </mesh>

      {/* Garden/Lawn */}
      <mesh position={[0, -0.25, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#90EE90" roughness={1} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight position={[-10, 10, -5]} intensity={0.5} angle={0.3} penumbra={1} />

      {/* House Model */}
      <HouseModel />

      {/* Camera and Controls */}
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
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
          <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-luxury-off-white/5 bg-gradient-to-b from-luxury-slate to-luxury-charcoal">
            <Canvas shadows>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
