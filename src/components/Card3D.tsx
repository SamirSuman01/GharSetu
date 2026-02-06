'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export function Card3D({
  children,
  className = '',
  maxTilt = 10
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -maxTilt
    const rotateYValue = ((x - centerX) / centerX) * maxTilt

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)

    // Calculate glare position (percentage)
    setGlareX((x / rect.width) * 100)
    setGlareY((y / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlareX(50)
    setGlareY(50)
  }

  return (
    <motion.div
      ref={ref}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Subtle glare effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
          zIndex: 1,
        }}
      />

      {/* Content with depth layers */}
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  )
}
