'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BentoCard {
  id: number
  title: string
  description: string
  image: string
  size: 'small' | 'medium' | 'large'
  category: string
}

const bentoCards: BentoCard[] = [
  {
    id: 1,
    title: 'Luxury Penthouses',
    description: 'Sky-high living with panoramic city views and exclusive amenities',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    size: 'large',
    category: 'Premium',
  },
  {
    id: 2,
    title: 'Private Villas',
    description: 'Secluded estates with lush gardens and private pools',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    size: 'medium',
    category: 'Exclusive',
  },
  {
    id: 3,
    title: 'Smart Homes',
    description: 'Fully automated residences with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    size: 'small',
    category: 'Modern',
  },
  {
    id: 4,
    title: 'Heritage Estates',
    description: 'Restored architectural marvels with timeless elegance',
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c119bc5b?w=800&q=80',
    size: 'medium',
    category: 'Classic',
  },
  {
    id: 5,
    title: 'Golf Course Residences',
    description: 'Premium properties overlooking championship golf courses',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    size: 'small',
    category: 'Premium',
  },
  {
    id: 6,
    title: 'Waterfront Living',
    description: 'Serene lakeside and riverside luxury properties',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    size: 'large',
    category: 'Exclusive',
  },
]

export function BentoGrid() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const getSizeClass = (size: string, isExpanded: boolean) => {
    if (isExpanded) return 'col-span-2 row-span-2'

    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'
      case 'medium':
        return 'col-span-1 row-span-2'
      case 'small':
        return 'col-span-1 row-span-1'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <section className="relative py-32 px-6 md:px-12 bg-luxury-charcoal overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-4">
            Property Categories
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-light text-luxury-off-white mb-4">
            Explore by <span className="text-gradient-gold">Style</span>
          </h2>
          <p className="text-luxury-off-white/60 max-w-2xl mx-auto">
            Click any card to expand and discover more
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[300px] gap-4">
          <AnimatePresence>
            {bentoCards.map((card, index) => {
              const isExpanded = expandedId === card.id

              return (
                <motion.div
                  key={card.id}
                  layout
                  className={`${getSizeClass(card.size, isExpanded)} cursor-pointer group relative overflow-hidden rounded-3xl`}
                  onClick={() => setExpandedId(isExpanded ? null : card.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: isExpanded ? 1 : 1.02 }}
                  transition={{
                    layout: { duration: 0.6, type: 'spring', bounce: 0.2 },
                    opacity: { delay: index * 0.1 },
                    scale: { delay: index * 0.1 },
                  }}
                >
                  {/* Image */}
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    layoutId={`image-${card.id}`}
                  />

                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-luxury-charcoal/60 to-transparent"
                    layoutId={`gradient-${card.id}`}
                  />

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-4 left-4"
                    layoutId={`badge-${card.id}`}
                  >
                    <span className="inline-block px-3 py-1 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-wider uppercase">
                      {card.category}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    layoutId={`content-${card.id}`}
                  >
                    <motion.h3
                      className="text-2xl font-display font-light text-luxury-off-white mb-2 group-hover:text-luxury-gold transition-colors"
                      layoutId={`title-${card.id}`}
                    >
                      {card.title}
                    </motion.h3>

                    <AnimatePresence>
                      {(isExpanded || card.size !== 'small') && (
                        <motion.p
                          className="text-luxury-off-white/70 text-sm"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {card.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {isExpanded && (
                      <motion.button
                        className="mt-4 px-6 py-2 glass-gold rounded-full text-sm font-medium text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        View Collection
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 border-2 border-luxury-gold/30 rounded-3xl" />
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
