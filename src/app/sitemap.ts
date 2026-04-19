import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.demigroen.nl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all pages from Sanity
  const pages = await client.fetch<{ slug: string; _updatedAt: string }[]>(
    `*[_type == "page"]{ "slug": slug.current, _updatedAt }`
  )

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((page) => page.slug && page.slug !== 'home') // homepage already above
    .map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [...staticRoutes, ...pageRoutes]
}
