'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
  id: number
  url: string
  title: string
  location: string
  price?: string
}

const horizontalImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
    title: 'Panoramic Terrace',
    location: 'Malabar Hill, Mumbai',
    price: '₹145 Cr',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=80',
    title: 'Private Courtyard',
    location: 'Golf Links, Delhi',
    price: '₹180 Cr',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80',
    title: 'Grand Living',
    location: 'Koramangala, Bangalore',
    price: '₹95 Cr',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1600607687644-aac4c119bc5b?w=1400&q=80',
    title: 'Sunset Balcony',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹120 Cr',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=80',
    title: 'Modern Luxury',
    location: 'Whitefield, Bangalore',
    price: '₹88 Cr',
  },
]

export function HorizontalScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return

    const section = sectionRef.current
    const scrollContainer = scrollRef.current

    // Calculate scroll distance
    const scrollWidth = scrollContainer.scrollWidth
    const sectionWidth = section.offsetWidth

    // Create horizontal scroll animation
    const scrollTween = gsap.to(scrollContainer, {
      x: -(scrollWidth - sectionWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      scrollTween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="horizontal-scroll-section relative bg-luxury-charcoal overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Section Header - Pinned */}
      <div className="absolute top-12 left-12 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-3">
            Featured Interiors
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light text-luxury-off-white">
            Scroll to <span className="text-gradient-gold">Explore</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div
        ref={scrollRef}
        className="horizontal-scroll-container flex items-center gap-8 h-screen px-12"
        style={{ width: 'max-content' }}
      >
        {horizontalImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="horizontal-scroll-item group cursor-pointer"
            style={{
              width: '70vw',
              maxWidth: '900px',
              height: '70vh',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className="relative h-full rounded-3xl overflow-hidden border border-luxury-off-white/10 hover:border-luxury-gold/30 transition-all duration-500">
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-luxury-charcoal/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="mb-4">
                  <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-wider uppercase">
                    {image.price}
                  </span>
                </div>
                <h3 className="text-3xl font-display font-light text-luxury-off-white mb-2 group-hover:text-luxury-gold transition-colors duration-500">
                  {image.title}
                </h3>
                <p className="text-luxury-off-white/60 font-light flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  {image.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* End spacer */}
        <div style={{ width: '20vw', flexShrink: 0 }} />
      </div>
    </section>
  )
}
