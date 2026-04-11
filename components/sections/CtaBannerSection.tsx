import Link from 'next/link'
import { getLang } from '@/lib/i18n'
import type { CtaBannerSection as CtaBannerSectionType } from '@/types/sections'

const themeClasses: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground',
  dark: 'bg-gray-900 text-white',
  light: 'bg-background text-body',
}

export default function CtaBannerSection({ section }: { section: CtaBannerSectionType }) {
  const heading = getLang(section.heading)
  const subheading = getLang(section.subheading)
  const theme = section.theme ?? 'primary'
  const bg = themeClasses[theme] ?? themeClasses.primary
  const isDark = theme === 'primary' || theme === 'dark'

  return (
    <section className={`py-section ${bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold">{heading}</h2>
        )}
        {subheading && (
          <p className={`text-lg ${isDark ? 'opacity-80' : 'text-muted'}`}>{subheading}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {section.primaryCta && (
            <Link
              href={section.primaryCta.href}
              target={section.primaryCta.blank ? '_blank' : undefined}
              rel={section.primaryCta.blank ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center px-6 py-3 rounded-md font-medium transition-base hover:opacity-90 ${
                isDark ? 'bg-white text-gray-900' : 'bg-primary text-primary-foreground'
              }`}
            >
              {section.primaryCta.label}
            </Link>
          )}
          {section.secondaryCta && (
            <Link
              href={section.secondaryCta.href}
              target={section.secondaryCta.blank ? '_blank' : undefined}
              rel={section.secondaryCta.blank ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center px-6 py-3 rounded-md font-medium border transition-base ${
                isDark
                  ? 'border-white/40 text-white hover:bg-white/10'
                  : 'border-border text-body hover:bg-border'
              }`}
            >
              {section.secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
