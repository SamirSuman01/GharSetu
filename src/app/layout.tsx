import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GharSetu | Private Advisory',
  description: 'Private real estate advisory for select clients in India.',
  keywords: ['private residences', 'real estate advisory', 'India', 'property consultation'],
  authors: [{ name: 'GharSetu' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'GharSetu | Private Advisory',
    description: 'Private real estate advisory for select clients in India.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-luxury-charcoal text-luxury-off-white overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
