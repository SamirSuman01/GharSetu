export default function Loading() {
  return (
    <div className="min-h-screen bg-luxury-charcoal flex items-center justify-center">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
        <p className="text-luxury-off-white/60 font-light tracking-wide">Loading...</p>
      </div>
    </div>
  )
}
