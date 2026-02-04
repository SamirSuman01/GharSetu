import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | GharSetu',
  description: 'GharSetu terms of service. Understanding our professional advisory relationship and services.',
  openGraph: {
    title: 'Terms of Service | GharSetu',
    description: 'GharSetu terms of service. Understanding our professional advisory relationship and services.',
    type: 'website',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
