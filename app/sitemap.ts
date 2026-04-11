import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { allPageSlugsQuery, allPostSlugsQuery, siteSettingsQuery } from '@/sanity/lib/queries'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [siteSettings, pageSlugs, postSlugs] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(allPageSlugsQuery),
      client.fetch(allPostSlugsQuery),
    ])

    if (siteSettings?.siteNoIndex) return []

    const pages: MetadataRoute.Sitemap = (pageSlugs ?? [])
      .filter((p: { slug: string; noIndex?: boolean }) => !p.noIndex && p.slug !== 'home')
      .map((p: { slug: string }) => ({
        url: p.slug === 'home' ? baseUrl : `${baseUrl}/${p.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))

    const homeEntry: MetadataRoute.Sitemap = [
      { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    ]

    const posts: MetadataRoute.Sitemap = (postSlugs ?? []).map(
      (p: { slug: string }) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    )

    return [...homeEntry, ...pages, { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 }, ...posts]
  } catch {
    return []
  }
}
