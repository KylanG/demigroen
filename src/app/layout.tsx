import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.demigroen.nl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Demi Groen — BUILD. NOT BLEND.',
    template: '%s | Demi Groen',
  },
  description: 'Video-first content strategie voor beauty founders. Meer organisch bereik, minder content stress.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: siteUrl,
    siteName: 'Demi Groen',
    title: 'Demi Groen — BUILD. NOT BLEND.',
    description: 'Video-first content strategie voor beauty founders. Meer organisch bereik, minder content stress.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demi Groen — BUILD. NOT BLEND.',
    description: 'Video-first content strategie voor beauty founders. Meer organisch bereik, minder content stress.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Suppress the automatic YouTube preconnect hint that Next.js adds
// when it detects an iframe — it causes an "unused preconnect" warning
// on pages that don't have a video.
export const viewport = {
  themeColor: '#8B1A5E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}