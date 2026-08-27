// Diagonal amber/black stripe divider — a construction "caution tape" motif used between sections.
export default function HazardStripe({ className = '' }) {
  return (
    <div
      role="presentation"
      className={`h-2.5 w-full ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, #fbbf24 0, #fbbf24 14px, #0f172a 14px, #0f172a 28px)',
      }}
    />
  )
}
