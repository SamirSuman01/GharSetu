import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Private Catalogue | GharSetu',
  description: 'Access our curated collection of distinguished residences. Private real estate advisory for select clients in India.',
  openGraph: {
    title: 'Request Private Catalogue | GharSetu',
    description: 'Access our curated collection of distinguished residences.',
    type: 'website',
  },
}

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
