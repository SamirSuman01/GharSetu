'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'consultation',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request')
      }

      setIsSubmitted(true)

      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal py-24">
      <div className="container-luxury max-w-3xl">
        {/* Back Button */}
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="mb-8 flex items-center gap-2 text-luxury-off-white/70 hover:text-luxury-gold transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </motion.button>
        </Link>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-4">
                Private Consultation
              </span>
              <h1 className="text-5xl md:text-6xl font-display font-light text-luxury-off-white mb-6">
                Arrange <span className="text-gradient-gold">Consultation</span>
              </h1>
              <p className="text-luxury-off-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                Schedule a private consultation with our advisory team. By appointment only.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300"
                  placeholder="Your full name"
                  style={{ backgroundColor: '#2D2D2D' }}
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300"
                    placeholder="your@email.com"
                    style={{ backgroundColor: '#2D2D2D' }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300"
                    placeholder="+91 XXXXX XXXXX"
                    style={{ backgroundColor: '#2D2D2D' }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                  Preferred Date & Time
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 resize-none"
                  placeholder="Preferred date and time for consultation..."
                  style={{ backgroundColor: '#2D2D2D' }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-10 py-4 bg-luxury-gold text-luxury-charcoal font-medium rounded-xl hover:bg-luxury-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Schedule Consultation'
                )}
              </motion.button>

              <p className="text-xs text-luxury-off-white/40 text-center font-light tracking-wide">
                Your information is handled with complete discretion and confidentiality.
              </p>
            </motion.form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-gold/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-display font-light text-luxury-off-white mb-4">
              Request Received
            </h2>
            <p className="text-luxury-off-white/60 font-light leading-relaxed">
              We will reach out within 24 hours to confirm your consultation appointment.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
