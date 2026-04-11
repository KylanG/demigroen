'use client'

import { usePathname } from 'next/navigation'

export default function PreviewBanner() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between gap-4 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-lg">
      <span>Voorbeeldmodus actief — je bekijkt conceptversies.</span>
      <a
        href={`/api/disable-draft?slug=${encodeURIComponent(pathname)}`}
        className="rounded-sm bg-white/20 px-3 py-1 hover:bg-white/30 transition-base"
      >
        Afsluiten
      </a>
    </div>
  )
}
