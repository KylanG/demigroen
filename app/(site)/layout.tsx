import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client, clientWithToken } from '@/sanity/lib/client'
import { headerSettingsQuery, footerSettingsQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PreviewBanner from '@/components/PreviewBanner'
import CookieBanner from '@/components/CookieBanner'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery)
    if (siteSettings?.siteNoIndex) {
      return { robots: { index: false, follow: false } }
    }
  } catch { /* geen Sanity config */ }
  return {}
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isPreview } = await draftMode()
  const sanity = isPreview ? clientWithToken : client

  let siteSettings = null, headerSettings = null, footerSettings = null
  try {
    ;[siteSettings, headerSettings, footerSettings] = await Promise.all([
      sanity.fetch(siteSettingsQuery),
      sanity.fetch(headerSettingsQuery),
      sanity.fetch(footerSettingsQuery),
    ])
  } catch {
    // No Sanity project configured yet
  }

  return (
    <>
      <Header settings={{ ...headerSettings, siteName: siteSettings?.siteName }} />
      <main>{children}</main>
      <Footer settings={{ ...footerSettings, siteName: siteSettings?.siteName, socials: siteSettings?.socials }} />
      {isPreview && <PreviewBanner />}
      <CookieBanner
        gtmId={siteSettings?.gtmId ?? undefined}
        ga4Id={siteSettings?.ga4Id ?? undefined}
      />
    </>
  )
}
