'use client'

import { TypeAnimation } from 'react-type-animation'

interface AnimatedTextProps {
  sequence: (string | number)[]
  className?: string
}

export function AnimatedText({ sequence, className = '' }: AnimatedTextProps) {
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={50}
      className={className}
      repeat={0}
    />
  )
}
