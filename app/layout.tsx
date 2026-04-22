import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

const headingFont = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-heading' })
const bodyFont = Montserrat({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-body' })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const s = await client.fetch(siteSettingsQuery)
    const icons: Metadata['icons'] = {}

    if (s?.faviconIco) {
      icons.icon = [
        { url: urlFor(s.faviconIco).width(32).height(32).url(), sizes: '32x32', type: 'image/png' },
        { url: urlFor(s.faviconIco).width(16).height(16).url(), sizes: '16x16', type: 'image/png' },
      ]
    }
    if (s?.appleTouchIcon) {
      icons.apple = { url: urlFor(s.appleTouchIcon).width(180).height(180).url(), sizes: '180x180' }
    }
    if (s?.webmanifestIcon) {
      icons.other = [
        { rel: 'icon', url: urlFor(s.webmanifestIcon).width(192).height(192).url(), sizes: '192x192' },
        { rel: 'icon', url: urlFor(s.webmanifestIcon).width(512).height(512).url(), sizes: '512x512' },
      ]
    }

    return {
      title: s?.siteName ?? 'SSUPPLY Starter',
      icons,
    }
  } catch {
    return { title: 'SSUPPLY Starter' }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
