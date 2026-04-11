import { getLang } from '@/lib/i18n'
import type { UspSection as UspSectionType, UspItem } from '@/types/sections'

export default function UspSection({ section }: { section: UspSectionType }) {
  const heading = getLang(section.heading)
  const usps = section.usps ?? []

  return (
    <section className="py-section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-body text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp: UspItem) => (
            <div key={usp._key} className="text-center space-y-3 p-6 rounded-md bg-background">
              {usp.icon && (
                <div className="text-4xl">{usp.icon}</div>
              )}
              {usp.title && (
                <h3 className="text-lg font-semibold text-body">
                  {getLang(usp.title)}
                </h3>
              )}
              {usp.text && (
                <p className="text-muted text-sm leading-relaxed">
                  {getLang(usp.text)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
