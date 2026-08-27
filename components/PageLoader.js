import Image from 'next/image'

export default function PageLoader({ visible }) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 transition-opacity duration-400 ease-out ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-amber-400/20 border-t-amber-400 motion-safe:animate-spin" />
        <Image src="/images/logo.png" alt="Kitti Construction" width={56} height={56} className="rounded-full object-contain" priority />
      </div>
    </div>
  )
}
