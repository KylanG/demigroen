export const revalidate = 0

import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import SectionRenderer from '@/components/SectionRenderer'
import HeroSection from '@/components/sections/HeroSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "home"][0]{ title, seo }`
  )
  if (!page) return {}

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    openGraph: page.seo?.ogImage
      ? { images: [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url() }] }
      : undefined,
    alternates: {
      canonical: '/',
    },
  }
}

export default async function HomePage() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "home"][0]{
      hero,
      sections
    }`
  )

  if (!page) return <p>Geen homepagina gevonden</p>

  return (
    <>
      <Navbar />
      {page.hero && <HeroSection {...page.hero} />}
      <SectionRenderer sections={page.sections} />
      <Footer />
    </>
  )
}