'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const particles: Particle[] = []
    const maxParticles = 100
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false

    const colors = ['#D4AF37', '#FFD700', '#FFC107', '#FFFFFF']

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true

      // Create particles on mouse move
      for (let i = 0; i < 3; i++) {
        if (particles.length < maxParticles) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 20,
            y: mouseY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            maxLife: 60 + Math.random() * 40,
            size: 2 + Math.random() * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(17, 17, 17, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Apply gravity and friction
        p.vy += 0.05
        p.vx *= 0.99
        p.vy *= 0.99

        // Update life
        p.life++

        // Remove dead particles
        if (p.life > p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        // Calculate opacity based on life
        const opacity = 1 - p.life / p.maxLife

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, p.color + Math.floor(opacity * 50).toString(16).padStart(2, '0'))
        gradient.addColorStop(1, p.color + '00')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
