'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function LiquidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        target.style.cursor === 'pointer' ||
        target.classList.contains('cursor-pointer')

      setIsPointer(isClickable)
    }

    window.addEventListener('mousemove', updateCursorPosition)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', updateCursorPosition)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Hide on mobile/tablet
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null
  }

  return (
    <motion.div
      ref={cursorRef}
      className="liquid-cursor"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Main cursor blob */}
      <motion.div
        className="cursor-blob"
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.6 : 0.8,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: isPointer
            ? 'radial-gradient(circle, rgba(201, 169, 98, 0.4) 0%, rgba(201, 169, 98, 0.1) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(245, 245, 243, 0.3) 0%, rgba(245, 245, 243, 0.05) 70%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          border: isPointer ? '1px solid rgba(201, 169, 98, 0.3)' : '1px solid rgba(245, 245, 243, 0.2)',
          boxShadow: isPointer
            ? '0 0 30px rgba(201, 169, 98, 0.3)'
            : '0 0 20px rgba(245, 245, 243, 0.1)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        animate={{
          scale: isPointer ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'rgba(201, 169, 98, 0.8)',
          boxShadow: '0 0 10px rgba(201, 169, 98, 0.6)',
        }}
      />
    </motion.div>
  )
}
