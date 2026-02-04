import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | GharSetu',
  description: 'GharSetu privacy policy. Learn how we protect your personal information and maintain confidentiality.',
  openGraph: {
    title: 'Privacy Policy | GharSetu',
    description: 'GharSetu privacy policy. Learn how we protect your personal information and maintain confidentiality.',
    type: 'website',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
