import Image from 'next/image'
import { getLang } from '@/lib/i18n'
import { urlFor } from '@/sanity/lib/image'
import type { TextImageSection as TextImageSectionType } from '@/types/sections'

export default function TextImageSection({ section }: { section: TextImageSectionType }) {
  const heading = getLang(section.heading)
  const body = getLang(section.text)
  const imageLeft = section.imagePosition === 'left'

  return (
    <section className="py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${imageLeft ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`space-y-5 ${imageLeft ? 'lg:order-2' : ''}`}>
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-body">{heading}</h2>
            )}
            {body && (
              <p className="text-muted leading-relaxed">{body}</p>
            )}
          </div>

          {section.image && (
            <div className={`relative aspect-4/3 rounded-md overflow-hidden shadow-lg ${imageLeft ? 'lg:order-1' : ''}`}>
              <Image
                src={urlFor(section.image).width(700).height(525).fit('crop').url()}
                alt={getLang(section.imageAlt) || heading || ''}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
