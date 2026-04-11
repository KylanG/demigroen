import Image from 'next/image'
import { getLang } from '@/lib/i18n'
import { urlFor } from '@/sanity/lib/image'
import type { TestimonialsSection as TestimonialsSectionType, TestimonialItem } from '@/types/sections'

export default function TestimonialsSection({ section }: { section: TestimonialsSectionType }) {
  const heading = getLang(section.heading)
  const testimonials = section.testimonials ?? []

  return (
    <section className="py-section bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-body text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t: TestimonialItem) => (
            <div key={t._key} className="bg-white rounded-md p-6 shadow-sm space-y-4">
              <p className="text-body italic leading-relaxed">
                &ldquo;{getLang(t.quote)}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                {t.photo && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={urlFor(t.photo).width(80).height(80).fit('crop').url()}
                      alt={t.photoAlt || t.name || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  {t.name && (
                    <p className="font-semibold text-body text-sm">{t.name}</p>
                  )}
                  {(t.role || t.company) && (
                    <p className="text-muted text-xs">
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
