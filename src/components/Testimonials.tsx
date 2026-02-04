'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  id: number
  quote: string
  attribution: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "An exercise in discretion and precision. The acquisition was handled with the utmost professionalism.",
    attribution: "Family Office Principal, Mumbai",
  },
  {
    id: 2,
    quote:
      "Their understanding of privacy and process is unmatched. A seamless experience from introduction to completion.",
    attribution: "Private Investor, Delhi",
  },
]

export function Testimonials() {
  return (
    <section className="py-32 bg-luxury-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
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
            Reflections
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-display font-display font-light text-luxury-off-white mb-6"
          >
            Client <span className="text-gradient-gold">Perspectives</span>
          </motion.h2>
        </div>

        {/* Static Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1.2 }}
            >
              <div className="glass-dark rounded-2xl p-10 border border-luxury-off-white/5 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-8">
                  <svg
                    className="w-12 h-12 text-luxury-gold/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>

                {/* Quote */}
                <p className="text-xl font-light text-luxury-off-white/80 leading-relaxed mb-8 flex-grow italic">
                  {testimonial.quote}
                </p>

                {/* Attribution */}
                <div className="pt-6 border-t border-luxury-off-white/5">
                  <p className="text-sm text-luxury-off-white/50 font-light tracking-wide">
                    — {testimonial.attribution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
