import { client } from '@/sanity/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import Container from '@/components/Container'

async function getSiteSettings() {
  return await client.fetch(`*[_type == "siteSettings"][0]{
    siteName,
    logo,
    navigation,
    ctaButton
  }`)
}

export default async function Navbar() {
  const settings = await getSiteSettings()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#8B1A5E] max-h-24">
      <Container className="py-4 flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="text-white font-bold text-xl leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
        {settings?.logo ? (
          <Image
            src={urlFor(settings.logo).url()}
            alt={settings.siteName ?? 'Logo'}
            width={80}
            height={50}
            priority
            className="object-contain"
          />
        ) : (
          <span>
            demi<br />
            <em>groen</em>
          </span>
        )}
      </a>

      {/* Navigatie */}
      <ul className="flex items-center gap-10">
        {settings?.navigation?.map((item: any, i: number) => (
          <li key={i}>
            <a
              href={item.url}
              className="text-white font-medium hover:opacity-70 transition"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Knop */}
      {settings?.ctaButton?.label && settings?.ctaButton?.url && (
        <a
          href={settings.ctaButton.url}
          target={settings.ctaButton.newTab ? '_blank' : '_self'}
          rel={settings.ctaButton.newTab ? 'noopener noreferrer' : undefined}
          className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {settings.ctaButton.label}
        </a>
      )}
      </Container>
    </nav>
  )
}