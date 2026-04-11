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
  heroPrimaryCta,
  heroSecondaryCta,
}: HeroData) {
  const heading = getLang(heroHeading) || title
  const subheading = getLang(heroSubheading)

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-body leading-tight">
              {heading}
            </h1>
            {subheading && (
              <p className="text-lg text-muted leading-relaxed">{subheading}</p>
            )}
            {(heroPrimaryCta || heroSecondaryCta) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {heroPrimaryCta && (
                  <Link
                    href={heroPrimaryCta.href}
                    target={heroPrimaryCta.blank ? '_blank' : undefined}
                    rel={heroPrimaryCta.blank ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-base"
                  >
                    {heroPrimaryCta.label}
                  </Link>
                )}
                {heroSecondaryCta && (
                  <Link
                    href={heroSecondaryCta.href}
                    target={heroSecondaryCta.blank ? '_blank' : undefined}
                    rel={heroSecondaryCta.blank ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center px-6 py-3 rounded-md border border-border text-body font-medium hover:bg-background transition-base"
                  >
                    {heroSecondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {heroImage && (
            <div className="relative aspect-4/3 rounded-md overflow-hidden shadow-xl">
              <Image
                src={urlFor(heroImage).width(800).height(600).fit('crop').url()}
                alt={getLang(heroImageAlt) || heading}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
