import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import HeroSection from '@/components/sections/HeroSection'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { urlFor } from '@/sanity/lib/image'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [page, siteSettings] = await Promise.all([
      client.fetch(pageBySlugQuery, { slug: 'home' }),
      client.fetch(siteSettingsQuery),
    ])
    const seo = page?.seo ?? siteSettings?.seo
    const title = seo?.title ?? siteSettings?.siteName ?? 'Home'
    const description = seo?.description ?? ''
    return {
      title,
      description,
      ...(seo?.noIndex && { robots: { index: false, follow: false } }),
      ...(siteSettings?.googleSiteVerification && {
        verification: { google: siteSettings.googleSiteVerification },
      }),
      openGraph: {
        title,
        description,
        images: (() => {
          const img = seo?.ogImage ?? siteSettings?.seo?.ogImage ?? siteSettings?.logo
          return img ? [{ url: urlFor(img).width(1200).height(630).url() }] : undefined
        })(),
      },
    }
  } catch {
    return { title: 'Home' }
  }
}

export default async function HomePage() {
  let page = null
  try {
    page = await client.fetch(pageBySlugQuery, { slug: 'home' })
  } catch {
    // No Sanity project configured yet
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Homepage niet gevonden. Maak een pagina met slug &ldquo;home&rdquo; aan in Sanity.</p>
      </div>
    )
  }

  return (
    <>
      <HeroSection
        title={page.title}
        heroHeading={page.heroHeading}
        heroSubheading={page.heroSubheading}
        heroImage={page.heroImage}
        heroImageAlt={page.heroImageAlt}
        heroPrimaryCta={page.heroPrimaryCta}
        heroSecondaryCta={page.heroSecondaryCta}
      />
      <SectionRenderer sections={page.blocks} />
    </>
  )
}
