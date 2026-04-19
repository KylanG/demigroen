import { client } from '@/sanity/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import Container from '@/components/Container'

async function getSiteSettings() {
  return await client.fetch(`*[_type == "siteSettings"][0]{
    logo,
    navigation,
    ctaButton,
    showSecondaryButton,
    secondaryButton
  }`)
}

export default async function Navbar() {
  const settings = await getSiteSettings()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <Container className="flex items-center justify-between min-h-24 w-full">

        {/* Logo */}
        <a href="/" className="" style={{ fontFamily: 'var(--font-playfair)' }}>
          {settings?.logo ? (
            <Image
              src={urlFor(settings.logo).url()}
              alt="Logo"
              width={80}
              height={50}
              priority
              style={{ width: 'auto', height: '40px' }}
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
        <ul className="flex gap-16">
          {settings?.navigation?.map((item: any, i: number) => (
            <li key={i}>
              <a
                href={item.url}
                className="text-white"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-3">
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
          {settings?.showSecondaryButton && settings?.secondaryButton?.label && settings?.secondaryButton?.url && (
            <a
              href={settings.secondaryButton.url}
              target={settings.secondaryButton.newTab ? '_blank' : '_self'}
              rel={settings.secondaryButton.newTab ? 'noopener noreferrer' : undefined}
              className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#8B1A5E] transition"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {settings.secondaryButton.label}
            </a>
          )}
        </div>

      </Container>
    </nav>
  )
}