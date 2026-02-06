'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.03
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Split text into characters
    const split = new SplitType(textRef.current, {
      types: 'chars,words',
      tagName: 'span',
    })

    // Animate characters on scroll
    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: stagger,
      duration: 0.8,
      delay: delay,
      ease: 'power4.out',
    })

    // Cleanup
    return () => {
      split.revert()
    }
  }, [children, delay, stagger])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
