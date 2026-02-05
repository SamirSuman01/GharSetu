'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 2000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-luxury">
            <div className="glass-dark rounded-2xl p-6 md:p-8 border border-luxury-gold/20 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-display font-light text-luxury-off-white mb-2">
                    Cookie Notice
                  </h3>
                  <p className="text-luxury-off-white/60 text-sm font-light leading-relaxed">
                    We use essential cookies for functionality. No tracking or advertising cookies are used.{' '}
                    <a
                      href="/privacy"
                      className="text-luxury-gold hover:underline"
                    >
                      Learn more
                    </a>
                  </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAccept}
                    className="flex-1 md:flex-none px-6 py-3 bg-luxury-gold text-luxury-charcoal font-medium rounded-full hover:bg-luxury-gold-light transition-all duration-300 text-sm"
                  >
                    Accept
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDecline}
                    className="flex-1 md:flex-none px-6 py-3 glass text-luxury-off-white font-medium rounded-full hover:bg-luxury-off-white/5 transition-all duration-300 text-sm"
                  >
                    Decline
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
