'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="page-transition"
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Liquid wipe effect */}
            <motion.div
              className="absolute inset-0 bg-luxury-charcoal origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Gold accent layer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-luxury-gold/20 to-transparent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] } }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Morphing circle reveal */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, borderRadius: '50%' }}
              animate={{
                scale: 20,
                borderRadius: ['50%', '30%', '20%', '0%'],
              }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                borderRadius: { duration: 0.8 }
              }}
            >
              <div className="w-32 h-32 bg-luxury-gold/10 backdrop-blur-xl" />
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-luxury-gold font-display text-2xl tracking-[0.3em] uppercase">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Loading
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  )
}
