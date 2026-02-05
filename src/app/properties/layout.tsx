import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Properties | GharSetu',
  description: 'Explore our complete portfolio of distinguished residences across India. Filter by city, type, and price range.',
  openGraph: {
    title: 'All Properties | GharSetu',
    description: 'Explore our complete portfolio of distinguished residences across India.',
    type: 'website',
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
