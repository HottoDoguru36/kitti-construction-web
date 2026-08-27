import { useEffect, useRef, useState } from 'react'

export default function ProcessTimeline({ steps }) {
  const [visible, setVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <div key={step} className="flex gap-4 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <span
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-amber-400 bg-slate-950 text-sm font-semibold text-amber-300 transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!scale-100"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'scale(1)' : 'scale(0.5)',
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                {index + 1}
              </span>
              {!isLast && (
                <span
                  className="mt-1 w-0.5 flex-1 origin-top bg-amber-400/60 transition-transform ease-out motion-reduce:!scale-y-100"
                  style={{
                    transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                    transitionDuration: '450ms',
                    transitionDelay: `${index * 200 + 150}ms`,
                  }}
                />
              )}
            </div>
            <div
              className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-x-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                transitionDelay: `${index * 200 + 100}ms`,
              }}
            >
              <span className="text-slate-700">{step}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
