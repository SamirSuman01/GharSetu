'use client'

import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface GalleryImage {
  id: number
  url: string
  title: string
  location: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    title: 'Grand Reception',
    location: 'Golf Links, Delhi',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&crop=edges&fit=crop',
    title: 'Private Study',
    location: 'Malabar Hill, Mumbai',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    title: 'Terrace Garden',
    location: 'Panchsheel Park, Delhi',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
    title: 'Primary Suite',
    location: 'Altamount Road, Mumbai',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80',
    title: 'Private Library',
    location: 'Jor Bagh, Delhi',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    title: 'Formal Dining',
    location: 'Cuffe Parade, Mumbai',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
    title: 'Inner Courtyard',
    location: 'Prithviraj Road, Delhi',
  },
]

export function PropertyGallery() {
  return (
    <section
      id="gallery"
      className="py-32 bg-luxury-charcoal relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
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
            Interiors
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-display font-display font-light text-luxury-off-white mb-6"
          >
            Select <span className="text-gradient-gold">Spaces</span>
          </motion.h2>
        </div>

        {/* Swiper Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="gallery-swiper"
        >
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            speed={1200}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 2,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            className="!pb-16"
          >
            {galleryImages.map((image) => (
              <SwiperSlide key={image.id} className="!w-[90%] md:!w-[70%] lg:!w-[50%]">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000"
                  />

                  {/* Subtle Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800" />

                  {/* Image info - minimal */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-800">
                    <h3 className="text-xl font-display font-light text-luxury-off-white mb-1">
                      {image.title}
                    </h3>
                    <p className="text-luxury-off-white/60 text-sm font-light">
                      {image.location}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
