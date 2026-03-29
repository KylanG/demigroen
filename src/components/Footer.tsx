import Image from 'next/image'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'

async function getSiteSettings() {
  return await client.fetch(`*[_type == "siteSettings"][0]{
    siteName,
    logo,
    tagline,
    navigation,
    footerLinks,
    socials
  }`)
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export default async function Footer() {
  const settings = await getSiteSettings()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#8B1A5E] pt-16 pb-8 px-8 md:px-16">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        {/* Logo + tagline */}
        <div className="flex flex-col gap-3">
          {settings?.logo ? (
            <div className="relative h-14 w-32">
              <Image
                src={urlFor(settings.logo).url()}
                alt={settings.siteName ?? 'Logo'}
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          ) : (
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              {settings?.siteName}
            </span>
          )}
          {settings?.tagline && (
            <p className="text-white/60 text-sm tracking-widest uppercase">
              {settings.tagline}
            </p>
          )}
        </div>

        {/* Footer links (e.g. Privacyverklaring) */}
        <div className="flex flex-col gap-3">
          {settings?.footerLinks?.map((link: any, i: number) => (
            <a
              key={i}
              href={link.url}
              className="text-white/70 hover:text-white transition text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          {settings?.navigation?.map((item: any, i: number) => (
            <a
              key={i}
              href={item.url}
              className="text-white/70 hover:text-white transition text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex flex-row md:flex-col gap-4 md:items-end">
          {settings?.socials?.linkedin && (
            <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          )}
          {settings?.socials?.instagram && (
            <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition" aria-label="Instagram">
              <InstagramIcon />
            </a>
          )}
          {settings?.socials?.tiktok && (
            <a href={settings.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition" aria-label="TikTok">
              <TikTokIcon />
            </a>
          )}
          {settings?.socials?.youtube && (
            <a href={settings.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition" aria-label="YouTube">
              <YouTubeIcon />
            </a>
          )}
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 pt-6 text-center">
        <p className="text-white/50 text-sm">
          Copyright © {settings?.siteName ?? 'Demi Groen'} 2025 - {currentYear}
        </p>
      </div>

    </footer>
  )
}
