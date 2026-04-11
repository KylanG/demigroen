import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery, allPageSlugsQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import HeroSection from '@/components/sections/HeroSection'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs: Array<{ slug: string }> = await client.fetch(allPageSlugsQuery)
    return slugs
      .filter((s) => s.slug !== 'home')
      .map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const [page, siteSettings] = await Promise.all([
      client.fetch(pageBySlugQuery, { slug }),
      client.fetch(siteSettingsQuery),
    ])
    const seo = page?.seo ?? siteSettings?.seo
    const title = seo?.title ?? page?.title ?? siteSettings?.siteName ?? slug
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
    return { title: slug }
  }
}

export const dynamicParams = true

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  let page = null
  try {
    page = await client.fetch(pageBySlugQuery, { slug })
  } catch {
    notFound()
  }

  if (!page) notFound()

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
