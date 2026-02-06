'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface BlobMorphProps {
  color?: string
  blur?: number
  opacity?: number
  size?: number
  className?: string
}

export function BlobMorph({
  color = '#D4AF37',
  blur = 100,
  opacity = 0.15,
  size = 600,
  className = '',
}: BlobMorphProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    // Multiple blob shapes to morph between
    const shapes = [
      // Shape 1: Organic blob
      'M 50,100 C 20,90 10,60 20,30 C 30,10 60,0 80,20 C 100,40 110,70 90,90 C 70,110 60,110 50,100',
      // Shape 2: Stretched blob
      'M 60,100 C 30,95 15,70 15,40 C 15,15 35,5 60,10 C 85,15 105,25 105,50 C 105,75 85,105 60,100',
      // Shape 3: Wide blob
      'M 50,90 C 25,85 5,65 10,40 C 15,20 30,10 50,10 C 70,10 85,20 90,40 C 95,65 75,95 50,90',
      // Shape 4: Tall blob
      'M 50,105 C 35,100 25,80 25,50 C 25,25 35,5 50,5 C 65,5 75,25 75,50 C 75,80 65,110 50,105',
    ]

    let currentIndex = 0
    let animationFrameId: number

    const morphBlob = () => {
      const nextIndex = (currentIndex + 1) % shapes.length
      const currentPath = shapes[currentIndex]
      const nextPath = shapes[nextIndex]

      const duration = 3000 + Math.random() * 2000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        if (pathRef.current) {
          pathRef.current.setAttribute(
            'd',
            progress < 0.5 ? currentPath : nextPath
          )
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          currentIndex = nextIndex
          setTimeout(morphBlob, 1000)
        }
      }

      animate()
    }

    morphBlob()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [1, 1.1, 0.95, 1.05, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <defs>
          <filter id={`blob-goo-${Math.random()}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
          </filter>
        </defs>

        <g filter={`url(#blob-goo-${Math.random()})`}>
          <path
            ref={pathRef}
            d="M 50,100 C 20,90 10,60 20,30 C 30,10 60,0 80,20 C 100,40 110,70 90,90 C 70,110 60,110 50,100"
            fill={color}
            opacity={opacity}
            style={{
              filter: `blur(${blur}px)`,
            }}
          />
        </g>
      </motion.svg>
    </div>
  )
}

export function BlobBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <BlobMorph
        color="#D4AF37"
        blur={120}
        opacity={0.08}
        size={800}
        className="top-[-200px] left-[-200px]"
      />
      <BlobMorph
        color="#FFD700"
        blur={150}
        opacity={0.05}
        size={600}
        className="top-[100px] right-[-150px]"
      />
      <BlobMorph
        color="#D4AF37"
        blur={100}
        opacity={0.1}
        size={700}
        className="bottom-[-100px] left-[10%]"
      />
      <BlobMorph
        color="#FFC107"
        blur={130}
        opacity={0.06}
        size={500}
        className="top-[40%] right-[20%]"
      />
      <BlobMorph
        color="#D4AF37"
        blur={110}
        opacity={0.09}
        size={650}
        className="bottom-[5%] right-[-100px]"
      />
    </div>
  )
}
