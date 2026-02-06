'use client'

import { ReactNode } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { Navigation } from '@/components/Navigation'
import { CookieConsent } from '@/components/CookieConsent'
import { LiquidCursor } from '@/components/LiquidCursor'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <LiquidCursor />
        <Navigation />
        <main>{children}</main>
        <CookieConsent />
      </SmoothScrollProvider>
    </ErrorBoundary>
  )
}
