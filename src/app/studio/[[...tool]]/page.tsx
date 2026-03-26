import { client } from '@/sanity/client'
import SectionRenderer from '@/components/SectionRenderer'

export default async function HomePage() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "home"][0]{
      sections
    }`
  )

  if (!page) return <p>Geen homepagina gevonden</p>

  return <SectionRenderer sections={page.sections} />
}