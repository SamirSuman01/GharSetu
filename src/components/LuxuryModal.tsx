'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'

interface LuxuryModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'catalogue' | 'consultation'
}

interface DropdownOption {
  value: string
  label: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  general?: string
}

function CustomDropdown({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 cursor-pointer flex items-center justify-between text-left"
        style={{ backgroundColor: '#2D2D2D' }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={value ? 'text-luxury-off-white' : 'text-luxury-off-white/30'}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-luxury-off-white/50 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 glass-dark rounded-xl overflow-hidden shadow-2xl z-20 border border-luxury-gold/10"
              style={{ backgroundColor: '#1A1A1A' }}
              role="listbox"
            >
              <div className="max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                    }}
                    role="option"
                    aria-selected={value === option.value}
                    className={`w-full px-5 py-3 text-luxury-off-white font-light cursor-pointer transition-all duration-200 text-left ${
                      value === option.value
                        ? 'bg-luxury-gold/20 text-luxury-gold'
                        : 'hover:bg-luxury-gold/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export function LuxuryModal({ isOpen, onClose, type }: LuxuryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    budget: '',
    preferredLocation: '',
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else {
      const phoneRegex = /^[+]?[\d\s-]{10,}$/
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number'
      }
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
          formType: type,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setIsSubmitted(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          budget: '',
          preferredLocation: '',
        })
      }, 3000)
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const isCatalogue = type === 'catalogue'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-luxury-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-2xl glass-dark rounded-3xl overflow-hidden border border-luxury-gold/20 shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-luxury-off-white/10 transition-all duration-300 group z-10"
              >
                <svg
                  className="w-5 h-5 text-luxury-off-white/70 group-hover:text-luxury-off-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="relative p-12 pb-8">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-luxury-gold rounded-full blur-[100px] opacity-10" aria-hidden="true" />

                    <div className="relative">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-4"
                      >
                        {isCatalogue ? 'Exclusive Access' : 'Private Consultation'}
                      </motion.span>

                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl font-display font-light text-luxury-off-white mb-4"
                      >
                        {isCatalogue ? (
                          <>
                            Request Private <span className="text-gradient-gold">Catalogue</span>
                          </>
                        ) : (
                          <>
                            Arrange <span className="text-gradient-gold">Consultation</span>
                          </>
                        )}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-luxury-off-white/60 font-light leading-relaxed"
                      >
                        {isCatalogue
                          ? 'Access our curated collection of distinguished residences. Discretion assured.'
                          : 'Schedule a private consultation with our advisory team. By appointment only.'}
                      </motion.p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-12 pb-12" noValidate>
                    {errors.general && (
                      <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {errors.general}
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                          Name <span className="text-luxury-gold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          aria-invalid={!!errors.name}
                          className={`w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 ${
                            errors.name ? 'ring-2 ring-red-500/50' : ''
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                        )}
                      </motion.div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                        >
                          <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                            Email <span className="text-luxury-gold">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            aria-invalid={!!errors.email}
                            className={`w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 ${
                              errors.email ? 'ring-2 ring-red-500/50' : ''
                            }`}
                            placeholder="your@email.com"
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                        >
                          <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                            Phone <span className="text-luxury-gold">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            aria-invalid={!!errors.phone}
                            className={`w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 ${
                              errors.phone ? 'ring-2 ring-red-500/50' : ''
                            }`}
                            placeholder="+91 XXXXX XXXXX"
                          />
                          {errors.phone && (
                            <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
                          )}
                        </motion.div>
                      </div>

                      {/* Budget & Location */}
                      {isCatalogue && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                          >
                            <CustomDropdown
                              label="Investment Range"
                              value={formData.budget}
                              onChange={(value) => setFormData({ ...formData, budget: value })}
                              options={[
                                { value: '10-25', label: '₹10-25 Cr' },
                                { value: '25-50', label: '₹25-50 Cr' },
                                { value: '50-100', label: '₹50-100 Cr' },
                                { value: '100+', label: '₹100+ Cr' },
                              ]}
                              placeholder="Select range"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                          >
                            <CustomDropdown
                              label="Preferred Location"
                              value={formData.preferredLocation}
                              onChange={(value) =>
                                setFormData({ ...formData, preferredLocation: value })
                              }
                              options={[
                                { value: 'delhi', label: 'Delhi NCR' },
                                { value: 'mumbai', label: 'Mumbai' },
                                { value: 'bangalore', label: 'Bangalore' },
                                { value: 'hyderabad', label: 'Hyderabad' },
                                { value: 'other', label: 'Other' },
                              ]}
                              placeholder="Select location"
                            />
                          </motion.div>
                        </div>
                      )}

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: isCatalogue ? 1.0 : 0.8, duration: 0.8 }}
                      >
                        <label className="block text-sm text-luxury-off-white/80 font-light mb-2 tracking-wide">
                          {isCatalogue ? 'Requirements' : 'Message'}
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          rows={4}
                          className="w-full px-5 py-3.5 glass rounded-xl text-luxury-off-white font-light placeholder:text-luxury-off-white/30 focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 resize-none"
                          placeholder={
                            isCatalogue
                              ? 'Briefly describe your requirements...'
                              : 'Preferred date and time for consultation...'
                          }
                        />
                      </motion.div>

                      {/* Submit Button */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: isCatalogue ? 1.1 : 0.9, duration: 0.8 }}
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                        className="w-full px-10 py-4 bg-luxury-gold text-luxury-charcoal font-medium rounded-xl hover:bg-luxury-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
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
                            Processing...
                          </span>
                        ) : (
                          <span>{isCatalogue ? 'Request Access' : 'Schedule Consultation'}</span>
                        )}
                      </motion.button>

                      {/* Discretion Note */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: isCatalogue ? 1.2 : 1.0, duration: 0.8 }}
                        className="text-xs text-luxury-off-white/40 text-center font-light tracking-wide"
                      >
                        Your information is handled with complete discretion.{' '}
                        <a href="/privacy" className="text-luxury-gold hover:underline">
                          Privacy Policy
                        </a>
                      </motion.p>
                    </div>
                  </form>
                </>
              ) : (
                // Success State
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-gold/10 flex items-center justify-center"
                  >
                    <svg
                      className="w-10 h-10 text-luxury-gold"
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
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-3xl font-display font-light text-luxury-off-white mb-4"
                  >
                    Request Received
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-luxury-off-white/60 font-light leading-relaxed"
                  >
                    {isCatalogue
                      ? 'Our advisors will contact you shortly with exclusive access to our private collection.'
                      : 'We will reach out within 24 hours to confirm your consultation appointment.'}
                  </motion.p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
