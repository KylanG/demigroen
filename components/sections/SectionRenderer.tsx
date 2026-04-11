/**
 * SectionRenderer — centrale dispatcher voor page builder sections.
 *
 * Hoe een nieuw section toevoegen:
 *   1. Importeer het component
 *   2. Voeg het toe aan `sectionComponents` met de Sanity `_type` als key
 *
 * De keys komen 1-op-1 overeen met de `name` waarden in de Sanity section schemas.
 */

import { PageSection } from '@/types/sections'
import TextImageSection from './TextImageSection'
import CtaBannerSection from './CtaBannerSection'
import UspSection from './UspSection'
import TestimonialsSection from './TestimonialsSection'
import FaqSection from './FaqSection'
import TeamSection from './TeamSection'
import ContactSection from './ContactSection'
import RichTextSection from './RichTextSection'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionComponents: Record<string, React.ComponentType<{ section: any }>> = {
  textImageBlock: TextImageSection,
  ctaBannerBlock: CtaBannerSection,
  uspBlock: UspSection,
  testimonialsBlock: TestimonialsSection,
  faqBlock: FaqSection,
  teamBlock: TeamSection,
  contactBlock: ContactSection,
  richTextSection: RichTextSection,
}

export default function SectionRenderer({ sections }: { sections: PageSection[] }) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section._type]

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `[SectionRenderer] Geen component gevonden voor section type: "${section._type}". ` +
              `Voeg het toe aan sectionComponents in components/sections/SectionRenderer.tsx.`
            )
          }
          return null
        }

        return <Component key={section._key} section={section} />
      })}
    </>
  )
}
