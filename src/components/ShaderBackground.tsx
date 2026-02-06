'use client'

import { useEffect, useRef } from 'react'

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0.5
    let mouseY = 0.5
    let targetMouseX = 0.5
    let targetMouseY = 0.5

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth
      targetMouseY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove)

    const createGradient = (time: number) => {
      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      const w = canvas.width
      const h = canvas.height

      // Create animated gradient that follows mouse
      const gradient = ctx.createRadialGradient(
        w * mouseX,
        h * mouseY,
        0,
        w * mouseX,
        h * mouseY,
        Math.max(w, h) * 0.8
      )

      // Luxury gold theme with animated colors
      const phase = time * 0.0005
      const r1 = Math.floor(17 + Math.sin(phase) * 5)
      const g1 = Math.floor(17 + Math.sin(phase + 1) * 5)
      const b1 = Math.floor(17 + Math.sin(phase + 2) * 5)

      gradient.addColorStop(0, `rgba(212, 175, 55, ${0.15 + Math.sin(phase) * 0.05})`)
      gradient.addColorStop(0.3, `rgba(255, 215, 0, ${0.08 + Math.sin(phase + 1) * 0.03})`)
      gradient.addColorStop(0.6, `rgba(${r1}, ${g1}, ${b1}, 0.5)`)
      gradient.addColorStop(1, 'rgba(17, 17, 17, 1)')

      return gradient
    }

    const animate = (time: number) => {
      // Create flowing gradient
      ctx.fillStyle = createGradient(time)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add second layer for depth
      const overlayGradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.0003) * 0.3),
        canvas.height * (0.5 + Math.cos(time * 0.0002) * 0.3),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.6
      )

      overlayGradient.addColorStop(0, 'rgba(255, 199, 7, 0.05)')
      overlayGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.02)')
      overlayGradient.addColorStop(1, 'transparent')

      ctx.fillStyle = overlayGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.6 }}
    />
  )
}
