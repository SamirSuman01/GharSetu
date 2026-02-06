'use client'

import { Hero } from '@/components/Hero'
import { CitiesMarquee } from '@/components/CitiesMarquee'
import { FeaturedProperties } from '@/components/FeaturedProperties'
import { PropertyGallery } from '@/components/PropertyGallery'
import { HorizontalScrollGallery } from '@/components/HorizontalScrollGallery'
import { MapExplorer } from '@/components/MapExplorer'
import { House3DViewer } from '@/components/House3DViewer'
import { TeamSection } from '@/components/TeamSection'
import { Testimonials } from '@/components/Testimonials'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { ParallaxProvider } from '@/components/ParallaxSection'

export default function Home() {
  return (
    <ParallaxProvider>
      <Hero />
      <CitiesMarquee />
      <FeaturedProperties />
      <PropertyGallery />
      <HorizontalScrollGallery />
      <MapExplorer />
      <House3DViewer />
      <TeamSection />
      <Testimonials />
      <ContactForm />
      <Footer />
    </ParallaxProvider>
  )
}
