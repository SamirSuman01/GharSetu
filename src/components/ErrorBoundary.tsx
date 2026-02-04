'use client'

import { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return <ErrorFallback onReset={() => this.setState({ hasError: false })} />
    }

    return this.props.children
  }
}

function ErrorFallback({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen bg-luxury-charcoal flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-display font-light text-luxury-off-white mb-4">
          Something went wrong
        </h2>

        <p className="text-luxury-off-white/60 font-light mb-8">
          We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-luxury-gold text-luxury-charcoal font-medium rounded-full hover:bg-luxury-gold-light transition-all duration-300"
          >
            Refresh Page
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            className="px-8 py-3 glass text-luxury-off-white font-medium rounded-full hover:bg-luxury-off-white/5 transition-all duration-300"
          >
            Try Again
          </motion.button>
        </div>

        <a
          href="/"
          className="inline-block mt-6 text-sm text-luxury-gold hover:underline"
        >
          Return to Home
        </a>
      </motion.div>
    </div>
  )
}

export default ErrorBoundary
