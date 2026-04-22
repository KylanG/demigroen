import Image from 'next/image'
import Link from 'next/link'
import { getLang } from '@/lib/i18n'
import { urlFor } from '@/sanity/lib/image'
import type { HeroData } from '@/types/sections'

export default function HeroSection({
  title,
  heroHeading,
  heroSubheading,
  heroImage,
  heroImageAlt,
  heroVideo,
  heroPrimaryCta,
  heroSecondaryCta,
}: HeroData) {
  const heading = getLang(heroHeading) || title
  const subheading = getLang(heroSubheading)
  const hasMedia = heroVideo || heroImage

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary">

      {/* Achtergrond video */}
      {heroVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* Achtergrond afbeelding */}
      {!heroVideo && heroImage && (
        <Image
          src={urlFor(heroImage).width(1920).height(1080).fit('crop').quality(90).url()}
          alt={getLang(heroImageAlt) || heading}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlay */}
      {hasMedia && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
        <div className="max-w-2xl space-y-6">
          <h1 className={`text-5xl font-bold leading-tight ${hasMedia ? 'text-white' : 'text-body'}`}>
            {heading}
          </h1>
          {subheading && (
            <p className="text-base text-white leading-relaxed">
              {subheading}
            </p>
          )}
          {(heroPrimaryCta || heroSecondaryCta) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {heroPrimaryCta && (
                <Link
                  href={heroPrimaryCta.href}
                  target={heroPrimaryCta.blank ? '_blank' : undefined}
                  rel={heroPrimaryCta.blank ? 'noopener noreferrer' : undefined}
                  className="btn-primary"
                >
                  {heroPrimaryCta.label}
                </Link>
              )}
              {heroSecondaryCta && (
                <Link
                  href={heroSecondaryCta.href}
                  target={heroSecondaryCta.blank ? '_blank' : undefined}
                  rel={heroSecondaryCta.blank ? 'noopener noreferrer' : undefined}
                  className={`btn-outline ${hasMedia ? 'border-white text-white hover:bg-white/10' : ''}`}
                >
                  {heroSecondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

    </section>
  )
}
