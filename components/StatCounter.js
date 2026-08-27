import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 1200

export default function StatCounter({ value, suffix = '', label }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return
        startedRef.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / DURATION_MS, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(eased * value))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold text-amber-300 sm:text-5xl">
        {display.toLocaleString('th-TH')}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-slate-300 sm:text-base">{label}</p>
    </div>
  )
}
