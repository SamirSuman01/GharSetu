'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParticleBackground } from '@/components/ParticleBackground'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      // Subtle parallax on video - barely perceptible
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Minimal scale effect
      gsap.to(videoRef.current, {
        scale: 1.05,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image - optimized for performance */}
      <div className="absolute inset-0 z-0">
        <div
          ref={videoRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center scale-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&auto=format')"
          }}
        />

        {/* Particle Effect */}
        <ParticleBackground />

        {/* Gradient Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/70 via-luxury-charcoal/50 to-luxury-charcoal opacity-75"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container-luxury text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-5 py-2 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase">
            Private Advisory
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-display-xl font-display font-light text-luxury-off-white mb-8 leading-[0.95] tracking-tight"
        >
          India's Private
          <br />
          <span className="text-gradient-gold">Residences</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-luxury-off-white/70 max-w-xl mx-auto mb-16 font-light leading-relaxed"
        >
          Private advisory for select residences in India.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link href="/catalogue">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-luxury-gold text-luxury-charcoal font-medium rounded-full hover:bg-luxury-gold-light transition-all duration-800 hover:shadow-lg hover:shadow-luxury-gold/20 min-w-[240px] text-sm tracking-wide"
            >
              Request Private Catalogue
            </motion.button>
          </Link>

          <Link href="/consultation">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 glass text-luxury-off-white font-medium rounded-full hover:bg-luxury-off-white/5 transition-all duration-800 min-w-[240px] text-sm tracking-wide"
            >
              Arrange Consultation
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
