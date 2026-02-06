'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { properties, type Property } from '@/lib/properties'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal'

// Get all properties and extract city from location
const allProperties = properties.map(property => ({
  ...property,
  type: property.title.includes('Bungalow') ? 'Bungalow' :
        property.title.includes('Penthouse') ? 'Penthouse' :
        property.title.includes('Mansion') ? 'Mansion' :
        property.title.includes('Estate') ? 'Villa' :
        property.title.includes('Villa') ? 'Villa' : 'Apartment',
  city: property.city,
}))

export default function PropertiesPage() {
  const [selectedCity, setSelectedCity] = useState<string>('All')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [priceRange, setPriceRange] = useState<string>('All')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const cities = ['All', ...Array.from(new Set(allProperties.map((p) => p.city)))]
  const types = ['All', ...Array.from(new Set(allProperties.map((p) => p.type)))]
  const priceRanges = ['All', 'Under ₹100 Cr', '₹100-150 Cr', 'Above ₹150 Cr']

  const filteredProperties = allProperties.filter((property) => {
    const cityMatch = selectedCity === 'All' || property.city === selectedCity
    const typeMatch = selectedType === 'All' || property.type === selectedType

    let priceMatch = true
    if (priceRange === 'Under ₹100 Cr') priceMatch = property.priceInCrores < 100
    if (priceRange === '₹100-150 Cr') priceMatch = property.priceInCrores >= 100 && property.priceInCrores <= 150
    if (priceRange === 'Above ₹150 Cr') priceMatch = property.priceInCrores > 150

    return cityMatch && typeMatch && priceMatch
  })

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-luxury-charcoal pt-32 pb-24">
        <div className="container-luxury">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-4">
            Private Collection
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-light text-luxury-off-white mb-6">
            All <span className="text-gradient-gold">Properties</span>
          </h1>
          <p className="text-luxury-off-white/60 font-light leading-relaxed max-w-2xl">
            Discover our complete portfolio of distinguished residences across India's most prestigious addresses.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* City Filter */}
          <div>
            <label className="block text-sm text-luxury-off-white/60 font-light mb-2 tracking-wide">
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-luxury-off-white font-light focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: '#2D2D2D' }}
            >
              {cities.map((city) => (
                <option key={city} value={city} style={{ backgroundColor: '#2D2D2D' }}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm text-luxury-off-white/60 font-light mb-2 tracking-wide">
              Property Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-luxury-off-white font-light focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: '#2D2D2D' }}
            >
              {types.map((type) => (
                <option key={type} value={type} style={{ backgroundColor: '#2D2D2D' }}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm text-luxury-off-white/60 font-light mb-2 tracking-wide">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-luxury-off-white font-light focus:outline-none focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: '#2D2D2D' }}
            >
              {priceRanges.map((range) => (
                <option key={range} value={range} style={{ backgroundColor: '#2D2D2D' }}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-luxury-off-white/50 font-light">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </p>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              onClick={() => {
                setSelectedProperty(property)
                setIsModalOpen(true)
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-luxury-slate/50 backdrop-blur-sm border border-luxury-off-white/5 hover:border-luxury-gold/20 transition-all duration-500 h-full">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-luxury-charcoal/30 to-transparent opacity-70" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 glass-gold rounded-full">
                    <span className="text-luxury-gold font-medium text-sm">₹{property.priceInCrores} Cr</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-wider uppercase mb-3">
                    {property.type}
                  </span>

                  <h3 className="text-2xl font-display font-light text-luxury-off-white mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                    {property.title}
                  </h3>

                  <p className="text-luxury-off-white/50 mb-4 text-sm font-light flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-xs text-luxury-off-white/60 font-light">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                      {(property.sqft / 1000).toFixed(1)}K sq ft
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="mt-6 flex items-center gap-2 text-luxury-off-white/70 hover:text-luxury-gold font-light text-sm tracking-wide group/btn transition-colors duration-300"
                  >
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-gold/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-display font-light text-luxury-off-white mb-3">
              No properties found
            </h3>
            <p className="text-luxury-off-white/60 font-light">
              Try adjusting your filters to see more results.
            </p>
          </motion.div>
        )}
        </div>
      </div>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
      />
      <Footer />
    </>
  )
}
