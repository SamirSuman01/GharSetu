'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { LuxuryModal } from '@/components/LuxuryModal'
import type { Property } from '@/lib/properties'

interface PropertyDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property | null
}

export function PropertyDetailsModal({ isOpen, onClose, property }: PropertyDetailsModalProps) {
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const scrollTop = useRef(0)

  // Reset image index when property changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [property?.id])

  // Drag to scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      startY.current = e.pageY - scrollContainer.offsetTop
      scrollTop.current = scrollContainer.scrollTop
      scrollContainer.style.cursor = 'grabbing'
      scrollContainer.style.userSelect = 'none'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      const y = e.pageY - scrollContainer.offsetTop
      const walk = (y - startY.current) * 2
      scrollContainer.scrollTop = scrollTop.current - walk
    }

    const handleMouseUp = () => {
      isDragging.current = false
      scrollContainer.style.cursor = 'grab'
      scrollContainer.style.userSelect = 'auto'
    }

    const handleMouseLeave = () => {
      isDragging.current = false
      scrollContainer.style.cursor = 'grab'
      scrollContainer.style.userSelect = 'auto'
    }

    scrollContainer.addEventListener('mousedown', handleMouseDown)
    scrollContainer.addEventListener('mousemove', handleMouseMove)
    scrollContainer.addEventListener('mouseup', handleMouseUp)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    scrollContainer.style.cursor = 'grab'

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown)
      scrollContainer.removeEventListener('mousemove', handleMouseMove)
      scrollContainer.removeEventListener('mouseup', handleMouseUp)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isOpen])

  if (!property) return null

  const allImages = [property.image, ...(property.galleryImages || [])]

  const handleScheduleViewing = () => {
    setIsEnquireModalOpen(true)
  }

  return (
    <>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto"
            >
              <div
                ref={scrollContainerRef}
                className="w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-dark rounded-3xl border border-luxury-gold/20 shadow-2xl pointer-events-auto my-8 scroll-smooth"
                onClick={(e) => e.stopPropagation()}
                style={{ scrollBehavior: 'smooth' }}
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

                {/* Image Gallery */}
                <div className="relative h-[50vh] overflow-hidden">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={allImages[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal to-transparent" />

                  {/* Gallery Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === 0 ? allImages.length - 1 : prev - 1
                          )
                        }
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300"
                      >
                        <svg
                          className="w-6 h-6 text-luxury-off-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === allImages.length - 1 ? 0 : prev + 1
                          )
                        }
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300"
                      >
                        <svg
                          className="w-6 h-6 text-luxury-off-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            role="tab"
                            aria-selected={index === currentImageIndex}
                            aria-label={`View image ${index + 1}`}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? 'w-8 bg-luxury-gold'
                                : 'w-4 bg-luxury-off-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="mb-8">
                    <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-4">
                      Available
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-light text-luxury-off-white mb-3">
                      {property.title}
                    </h2>
                    <p className="text-luxury-off-white/60 text-lg font-light flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {property.location}
                    </p>
                  </div>

                  {/* Price and Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-8 glass-dark rounded-2xl">
                    <div>
                      <div className="text-xs text-luxury-off-white/50 font-light mb-2 tracking-wider uppercase">
                        Price
                      </div>
                      <div className="text-2xl font-display text-gradient-gold">
                        {property.priceInCrores ? `₹${property.priceInCrores} Cr` : 'On Request'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-luxury-off-white/50 font-light mb-2 tracking-wider uppercase">
                        Bedrooms
                      </div>
                      <div className="text-2xl font-display text-luxury-off-white">
                        {property.bedrooms}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-luxury-off-white/50 font-light mb-2 tracking-wider uppercase">
                        Bathrooms
                      </div>
                      <div className="text-2xl font-display text-luxury-off-white">
                        {property.bathrooms}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-luxury-off-white/50 font-light mb-2 tracking-wider uppercase">
                        Area
                      </div>
                      <div className="text-2xl font-display text-luxury-off-white">
                        {(property.sqft / 1000).toFixed(1)}K sq ft
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-light text-luxury-off-white mb-4">
                      About this Property
                    </h3>
                    <p className="text-luxury-off-white/70 font-light leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-light text-luxury-off-white mb-4">
                      Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-luxury-off-white/70 font-light"
                        >
                          <svg
                            className="w-5 h-5 text-luxury-gold flex-shrink-0"
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
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleScheduleViewing}
                      className="flex-1 px-8 py-4 bg-luxury-gold text-luxury-charcoal font-medium rounded-xl hover:bg-luxury-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20 tracking-wide"
                    >
                      Schedule Private Viewing
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleScheduleViewing}
                      className="flex-1 px-8 py-4 glass-gold text-luxury-gold font-medium rounded-xl hover:bg-luxury-gold/10 transition-all duration-300 border border-luxury-gold/20 tracking-wide"
                    >
                      Request Details
                    </motion.button>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-luxury-off-white/40 text-center mt-8 font-light tracking-wide">
                    All information subject to verification. Private viewings by appointment only.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enquire Modal */}
      <LuxuryModal
        isOpen={isEnquireModalOpen}
        onClose={() => setIsEnquireModalOpen(false)}
        type="consultation"
      />
    </>
  )
}
