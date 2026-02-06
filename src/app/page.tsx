'use client'

import { Hero } from '@/components/Hero'
import { FeaturedProperties } from '@/components/FeaturedProperties'
import { PropertyGallery } from '@/components/PropertyGallery'
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
      <FeaturedProperties />
      <PropertyGallery />
      <MapExplorer />
      <House3DViewer />
      <TeamSection />
      <Testimonials />
      <ContactForm />
      <Footer />
    </ParallaxProvider>
  )
}
