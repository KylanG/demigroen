import { client } from '@/sanity/client'
import SectionRenderer from '@/components/SectionRenderer'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "home"][0]{
      sections
    }`
  )

  if (!page) return <p>Geen homepagina gevonden</p>

  return (
    <>
      <Navbar />
      <SectionRenderer sections={page.sections} />
      <Footer />
    </>
  )
}