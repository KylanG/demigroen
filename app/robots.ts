import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery)

    if (siteSettings?.siteNoIndex) {
      return { rules: { userAgent: '*', disallow: '/' } }
    }

    return {
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  } catch {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
}
