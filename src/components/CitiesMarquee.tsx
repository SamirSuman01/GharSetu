'use client'

import { InfiniteMarquee } from '@/components/InfiniteMarquee'
import { motion } from 'framer-motion'

const cities = [
  { name: 'Delhi NCR', icon: '🏛️' },
  { name: 'Mumbai', icon: '🌊' },
  { name: 'Bangalore', icon: '🌳' },
  { name: 'Hyderabad', icon: '💎' },
  { name: 'Chennai', icon: '🏖️' },
  { name: 'Pune', icon: '🏔️' },
  { name: 'Kolkata', icon: '🏛️' },
  { name: 'Goa', icon: '🌴' },
]

export function CitiesMarquee() {
  return (
    <section className="py-20 bg-luxury-slate/30 border-y border-luxury-off-white/5 overflow-hidden">
      <div className="mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="inline-block text-xs font-medium text-luxury-gold/60 tracking-[0.3em] uppercase"
        >
          Serving India's Finest Addresses
        </motion.span>
      </div>

      {/* First row - scrolling left */}
      <InfiniteMarquee speed={30} direction="left" className="mb-8">
        {cities.map((city, index) => (
          <div
            key={`${city.name}-${index}`}
            className="flex items-center gap-3 px-8 py-4 glass-premium rounded-full border border-luxury-off-white/10 hover:border-luxury-gold/30 transition-all duration-500 whitespace-nowrap"
          >
            <span className="text-2xl">{city.icon}</span>
            <span className="text-sm font-light text-luxury-off-white tracking-wider">
              {city.name}
            </span>
          </div>
        ))}
      </InfiniteMarquee>

      {/* Second row - scrolling right */}
      <InfiniteMarquee speed={40} direction="right">
        {[...cities].reverse().map((city, index) => (
          <div
            key={`${city.name}-reverse-${index}`}
            className="flex items-center gap-3 px-8 py-4 glass-premium rounded-full border border-luxury-off-white/10 hover:border-luxury-gold/30 transition-all duration-500 whitespace-nowrap"
          >
            <span className="text-2xl">{city.icon}</span>
            <span className="text-sm font-light text-luxury-off-white tracking-wider">
              {city.name}
            </span>
          </div>
        ))}
      </InfiniteMarquee>
    </section>
  )
}
