'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal'
import { Card3D } from '@/components/Card3D'
import { properties, type Property } from '@/lib/properties'

gsap.registerPlugin(ScrollTrigger)

export function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Very subtle parallax on images - reduced to prevent disappearing
      const cards = sectionRef.current?.querySelectorAll('.property-card')
      cards?.forEach((card) => {
        const image = card.querySelector('.property-image')
        if (image) {
          gsap.to(image, {
            y: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-luxury-charcoal to-luxury-slate relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="inline-block px-5 py-2 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-6"
          >
            Private Collection
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-display font-display font-light text-luxury-off-white mb-6"
          >
            Private <span className="text-gradient-gold">Residences</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-xl text-luxury-off-white/70 max-w-2xl mx-auto font-light"
          >
            A curated selection for discerning clientele.
          </motion.p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} onClick={() => handlePropertyClick(property)} />
          ))}
        </div>

        {/* Discrete note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-luxury-off-white/50 font-light tracking-wide">
            Additional residences are reviewed privately.
          </p>
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

function PropertyCard({ property, onClick }: { property: Property; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      className="property-card group cursor-pointer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      <Card3D maxTilt={8} className="h-full">
        <div className="relative overflow-hidden rounded-2xl bg-luxury-slate/50 backdrop-blur-sm border border-luxury-off-white/5 hover:border-luxury-gold/20 transition-all duration-800 h-full">
        {/* Image Container */}
        <div className="relative h-96 overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
          <div className="property-image absolute inset-0">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-luxury-charcoal/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-800" />

          {/* Price */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="text-2xl font-display font-light text-luxury-off-white tracking-wide"
            >
              {property.priceInCrores ? `₹ ${property.priceInCrores} Cr` : 'On Request'}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-display font-light text-luxury-off-white mb-3 group-hover:text-luxury-gold transition-colors duration-800">
            {property.title}
          </h3>

          <p className="text-luxury-off-white/50 mb-6 text-sm font-light tracking-wide">
            {property.location}
          </p>

          {/* Minimal Property Details */}
          <div className="flex items-center gap-8 text-xs text-luxury-off-white/60 font-light tracking-wider">
            <span>{property.bedrooms} Bedrooms</span>
            <span>{(property.sqft / 1000).toFixed(1)}K sq ft</span>
          </div>

          {/* Discrete CTA */}
          <motion.button
            whileHover={{ x: 3 }}
            className="mt-8 flex items-center gap-2 text-luxury-off-white/70 font-light text-sm tracking-wide group/btn"
          >
            <span>Enquire</span>
            <svg
              className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      </Card3D>
    </motion.div>
  )
}
