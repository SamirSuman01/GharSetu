'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrambleTextProps {
  children: string
  className?: string
  speed?: number
  scrambleSpeed?: number
  characters?: string
  onHover?: boolean
}

export function ScrambleText({
  children,
  className = '',
  speed = 50,
  scrambleSpeed = 30,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₹$€£¥@#%&',
  onHover = false
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(children)
  const [isScrambling, setIsScrambling] = useState(!onHover)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const originalText = children

  const scramble = () => {
    let iteration = 0
    const maxIterations = originalText.length

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '

            if (index < iteration) {
              return originalText[index]
            }

            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      iteration += 1 / 3

      if (iteration >= maxIterations) {
        setDisplayText(originalText)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setIsScrambling(false)
      }
    }, scrambleSpeed)
  }

  useEffect(() => {
    if (!onHover && !isScrambling) {
      scramble()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (onHover) {
      setIsScrambling(true)
      scramble()
    }
  }

  return (
    <span
      className={`scramble-text ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{
        fontFamily: 'monospace',
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.05em',
      }}
    >
      {displayText}
    </span>
  )
}
