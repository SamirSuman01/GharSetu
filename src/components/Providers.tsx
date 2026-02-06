'use client'

import { ReactNode } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { Navigation } from '@/components/Navigation'
import { CookieConsent } from '@/components/CookieConsent'
import { LiquidCursor } from '@/components/LiquidCursor'
import { BlobBackground } from '@/components/BlobMorph'
import { MouseParticles } from '@/components/MouseParticles'
import { ShaderBackground } from '@/components/ShaderBackground'
import { PageTransition } from '@/components/PageTransition'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <ShaderBackground />
        <BlobBackground />
        <MouseParticles />
        <LiquidCursor />
        <Navigation />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <CookieConsent />
      </SmoothScrollProvider>
    </ErrorBoundary>
  )
}
