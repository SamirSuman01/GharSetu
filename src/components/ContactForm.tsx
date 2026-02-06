'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FormErrors {
  name?: string
  city?: string
  investmentRange?: string
  message?: string
  general?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    investmentRange: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.investmentRange) {
      newErrors.investmentRange = 'Please select your investment range'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'contact',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        investmentRange: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const cities = [
    'Delhi NCR',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Other',
  ]

  return (
    <section
      id="contact"
      className="py-32 bg-gradient-to-b from-luxury-slate to-luxury-charcoal relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="inline-block px-5 py-2 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-6"
          >
            Appointment Only
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-display font-display font-light text-luxury-off-white mb-6"
          >
            Private <span className="text-gradient-gold">Consultation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-lg text-luxury-off-white/60 max-w-xl mx-auto font-light"
          >
            All requests are reviewed personally.
          </motion.p>
        </div>

        {/* Centered Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="max-w-2xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-3xl p-10 md:p-12 border border-luxury-gold/20 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-luxury-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-light text-luxury-off-white mb-3">
                Request Received
              </h3>
              <p className="text-luxury-off-white/60 font-light">
                Our advisory team will contact you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-dark rounded-3xl p-10 md:p-12 border border-luxury-off-white/5"
              noValidate
            >
              {errors.general && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {errors.general}
                </div>
              )}

              <div className="space-y-8">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-light text-luxury-off-white/60 mb-3 tracking-wider uppercase"
                  >
                    Name <span className="text-luxury-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-5 py-4 bg-luxury-charcoal/50 border rounded-xl text-luxury-off-white placeholder-luxury-off-white/30 focus:outline-none focus:border-luxury-gold/30 transition-all duration-800 font-light ${
                      errors.name ? 'border-red-500/50' : 'border-luxury-off-white/10'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-light text-luxury-off-white/60 mb-3 tracking-wider uppercase"
                    >
                      Email <span className="text-luxury-gold">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-luxury-charcoal/50 border border-luxury-off-white/10 rounded-xl text-luxury-off-white placeholder-luxury-off-white/30 focus:outline-none focus:border-luxury-gold/30 transition-all duration-800 font-light"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-light text-luxury-off-white/60 mb-3 tracking-wider uppercase"
                    >
                      Phone <span className="text-luxury-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-luxury-charcoal/50 border border-luxury-off-white/10 rounded-xl text-luxury-off-white placeholder-luxury-off-white/30 focus:outline-none focus:border-luxury-gold/30 transition-all duration-800 font-light"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs font-light text-luxury-off-white/60 mb-3 tracking-wider uppercase"
                  >
                    City <span className="text-luxury-gold">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? 'city-error' : undefined}
                    className={`w-full px-5 py-4 bg-luxury-charcoal/50 border rounded-xl text-luxury-off-white focus:outline-none focus:border-luxury-gold/30 transition-all duration-800 font-light ${
                      errors.city ? 'border-red-500/50' : 'border-luxury-off-white/10'
                    }`}
                  >
                    <option value="">Select your city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p id="city-error" className="mt-2 text-sm text-red-400">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Investment Range */}
                <div>
                  <label
                    htmlFor="investmentRange"
                    className="block text-xs font-light text-luxury-off-white/60 mb-3 tracking-wider uppercase"
                  >
                    Investment Range <span className="text-luxury-gold">*</span>
                  </label>
                  <select
                    id="investmentRange"
                    name="investmentRange"
                    required
                    value={formData.investmentRange}
                    onChange={handleChange}
                    aria-invalid={!!errors.investmentRange}
                    aria-describedby={errors.investmentRange ? 'investment-error' : undefined}
                    className={`w-full px-5 py-4 bg-luxury-charcoal/50 border rounded-xl text-luxury-off-white focus:outline-none focus:border-luxury-gold/30 transition-all duration-800 font-light ${
                      errors.investmentRange ? 'border-red-500/50' : 'border-luxury-off-white/10'
                    }`}
                  >
                    <option value="">Select range</option>
                    <option value="10-25cr">₹ 10-25 Cr</option>
                    <option value="25-50cr">₹ 25-50 Cr</option>
                    <option value="50-100cr">₹ 50-100 Cr</option>
                    <option value="100cr+">₹ 100 Cr+</option>
                  </select>
                  {errors.investmentRange && (
                    <p id="investment-error" className="mt-2 text-sm text-red-400">
                      {errors.investmentRange}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-light text-luxury-off-white/60 mb-3 tracking-wider uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-luxury-charcoal/50 border border-luxury-off-white/10 rounded-xl text-luxury-off-white placeholder-luxury-off-white/30 focus:outline-none focus:border-luxury-gold/30 transition-all duration-800 resize-none font-light"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-full px-8 py-4 bg-luxury-gold text-luxury-charcoal font-light text-sm tracking-wide rounded-full hover:bg-luxury-gold-light transition-all duration-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
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
                      Submitting...
                    </span>
                  ) : (
                    'Submit Inquiry'
                  )}
                </motion.button>

                {/* Privacy note */}
                <p className="text-xs text-luxury-off-white/40 text-center font-light">
                  Your information is handled with complete discretion.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
