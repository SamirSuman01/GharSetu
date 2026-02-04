'use client'

import { ReactNode } from 'react'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = -10, className = '' }: ParallaxSectionProps) {
  return (
    <Parallax speed={speed} className={className}>
      {children}
    </Parallax>
  )
}

export { ParallaxProvider }
