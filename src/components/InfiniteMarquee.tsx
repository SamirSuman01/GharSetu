'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'

interface InfiniteMarqueeProps {
  children: React.ReactNode[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export function InfiniteMarquee({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}: InfiniteMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const xPosition = useMotionValue(0)
  const controls = useAnimation()

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth)
    }
  }, [children])

  useEffect(() => {
    if (contentWidth === 0) return

    const duration = contentWidth / speed

    controls.start({
      x: direction === 'left' ? -contentWidth : contentWidth,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
      },
    })
  }, [contentWidth, speed, direction, controls, isPaused])

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
      controls.stop()
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
      const duration = contentWidth / speed
      const currentX = xPosition.get()
      const remainingDistance = direction === 'left'
        ? -contentWidth - currentX
        : contentWidth - currentX
      const remainingDuration = (Math.abs(remainingDistance) / contentWidth) * duration

      controls.start({
        x: direction === 'left' ? -contentWidth : contentWidth,
        transition: {
          duration: remainingDuration,
          ease: 'linear',
          repeat: Infinity,
        },
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`marquee-container overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="marquee-content flex gap-8 items-center"
        style={{ x: xPosition }}
        animate={controls}
      >
        {/* First set */}
        <div ref={contentRef} className="flex gap-8 items-center">
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-8 items-center" aria-hidden="true">
          {children}
        </div>
        {/* Extra duplicate for safety */}
        <div className="flex gap-8 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
