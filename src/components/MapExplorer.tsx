'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { properties, formatCurrency, type Property } from '@/lib/properties'
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal'

const propertyLocations = properties.filter(p => p.position)

export function MapExplorer() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewProperty = (property: Property) => {
    setIsModalOpen(true)
  }

  return (
    <section
      id="locations"
      className="py-32 bg-luxury-slate relative overflow-hidden"
    >
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="inline-block px-5 py-2 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-6"
          >
            Locations
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-display font-display font-light text-luxury-off-white mb-6"
          >
            Select <span className="text-gradient-gold">Addresses</span>
          </motion.h2>
        </div>

        {/* Map Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Map Container */}
          <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-luxury-off-white/10 shadow-2xl relative bg-gradient-to-br from-luxury-charcoal via-luxury-charcoal-light to-luxury-slate">
            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" aria-hidden="true">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-luxury-gold"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Decorative Map Lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 800 600"
              fill="none"
              aria-hidden="true"
            >
              {/* Curved decorative lines suggesting a map */}
              <path
                d="M 100 300 Q 250 200, 400 300 T 700 300"
                stroke="url(#gradient1)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <path
                d="M 150 150 Q 300 100, 450 150 T 750 150"
                stroke="url(#gradient1)"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <path
                d="M 50 450 Q 200 400, 350 450 T 650 450"
                stroke="url(#gradient1)"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A962" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#C9A962" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#C9A962" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-luxury-gold rounded-full blur-[100px] opacity-10 animate-pulse-slow" aria-hidden="true" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-luxury-gold rounded-full blur-[100px] opacity-10 animate-pulse-slow" style={{ animationDelay: '1s' }} aria-hidden="true" />

            {/* Property Markers */}
            {propertyLocations.map((property, index) => (
              <motion.button
                key={property.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.3 }}
                onClick={() => setSelectedProperty(property)}
                aria-label={`View ${property.title} in ${property.location}`}
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: property.position?.x, top: property.position?.y }}
              >
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-luxury-gold opacity-20 animate-ping" aria-hidden="true" />

                {/* Marker circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-luxury-gold-light to-luxury-gold border-2 border-luxury-gold-light/30 shadow-lg shadow-luxury-gold/40 group-hover:shadow-luxury-gold/70 transition-all duration-300">
                  <div className="absolute inset-2 rounded-full bg-luxury-charcoal/40 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-luxury-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Location label */}
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-luxury-gold bg-luxury-charcoal/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  {property.location}
                </span>
              </motion.button>
            ))}

            {/* Instructions */}
            {!selectedProperty && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-dark px-6 py-3 rounded-full text-luxury-off-white/80 text-sm backdrop-blur-xl"
              >
                Click on markers to explore properties
              </motion.div>
            )}
          </div>

          {/* Selected Property Card */}
          <AnimatePresence>
            {selectedProperty && (
              <motion.div
                initial={{ opacity: 0, x: -100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-auto w-auto md:w-80 max-w-sm glass-dark rounded-2xl overflow-hidden border border-luxury-gold/20 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedProperty(null)}
                  aria-label="Close property card"
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center glass rounded-full hover:bg-luxury-off-white/10 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-luxury-off-white"
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

                <div className="relative h-48">
                  <Image
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-luxury-off-white mb-2">
                    {selectedProperty.title}
                  </h3>

                  <p className="text-luxury-off-white/60 mb-4 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
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
                    {selectedProperty.location}
                  </p>

                  <div className="text-3xl font-display font-bold text-gradient-gold mb-4">
                    ₹{selectedProperty.priceInCrores} Cr
                  </div>

                  <div className="flex items-center gap-4 text-sm text-luxury-off-white/70 mb-6">
                    <div className="flex items-center gap-1">
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
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span>{selectedProperty.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{selectedProperty.bathrooms} Baths</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewProperty(selectedProperty)}
                    className="w-full px-6 py-3 bg-luxury-gold text-luxury-charcoal font-semibold rounded-full hover:bg-luxury-gold-light transition-all duration-300"
                  >
                    View Property
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Location Cards Grid - Alternative view */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {propertyLocations.map((property, index) => (
            <motion.button
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass-dark rounded-xl p-4 text-left border border-luxury-off-white/5 hover:border-luxury-gold/30 transition-all duration-300"
            >
              <div className="text-lg font-display font-semibold text-luxury-off-white mb-1">
                {property.location.split(',')[0]}
              </div>
              <div className="text-sm text-luxury-off-white/60 mb-2">
                {property.location.split(',')[1]}
              </div>
              <div className="text-luxury-gold font-semibold text-sm">
                ₹{property.priceInCrores} Cr
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
      />
    </section>
  )
}
