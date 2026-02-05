import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | GharSetu',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-luxury-charcoal flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-display font-light text-luxury-gold mb-4">404</h1>
          <h2 className="text-3xl font-display font-light text-luxury-off-white mb-4">
            Page Not Found
          </h2>
          <p className="text-luxury-off-white/60 font-light leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-4 bg-luxury-gold text-luxury-charcoal font-medium rounded-full hover:bg-luxury-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
