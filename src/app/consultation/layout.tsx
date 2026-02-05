import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arrange Consultation | GharSetu',
  description: 'Schedule a private consultation with our advisory team. Appointment-only service for distinguished property advisory.',
  openGraph: {
    title: 'Arrange Consultation | GharSetu',
    description: 'Schedule a private consultation with our advisory team.',
    type: 'website',
  },
}

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
