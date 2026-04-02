import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import SectionRenderer from '@/components/SectionRenderer'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string) {
  return await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      slug,
      seo,
      sections
    }`,
    { slug }
  )
}

// Pre-render all pages at build time
export async function generateStaticParams() {
  const pages = await client.fetch(`*[_type == "page"]{ "slug": slug.current }`)
  return pages.map((page: { slug: string }) => ({ slug: page.slug }))
}

// Dynamic SEO per page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    openGraph: page.seo?.ogImage
      ? { images: [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }] }
      : undefined,
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <>
      <Navbar />
      <SectionRenderer sections={page.sections} />
      <Footer />
    </>
  )
}
