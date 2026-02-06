'use client'

import { ReactNode } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navigation } from '@/components/Navigation'
import { CookieConsent } from '@/components/CookieConsent'
import { LiquidCursor } from '@/components/LiquidCursor'
import { PageTransition } from '@/components/PageTransition'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <LiquidCursor />
      <Navigation />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <CookieConsent />
    </ErrorBoundary>
  )
}
