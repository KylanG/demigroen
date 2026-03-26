import HeroSection from './sections/HeroSection'
import TextImageSection from './sections/TextImageSection'
import StatsSection from './sections/StatsSection'
import CtaSection from './sections/CtaSection'
import ClientSlider from './sections/ClientSlider'

export default function SectionRenderer({ sections }: { sections: any[] }) {
  if (!sections) return null

  return (
    <>
      {sections.map((section, i) => {
        switch (section._type) {
          case 'heroSection':
            return <HeroSection key={i} {...section} />
          case 'textImageSection':
            return <TextImageSection key={i} {...section} />
          case 'statsSection':
            return <StatsSection key={i} {...section} />
          case 'ctaSection':
            return <CtaSection key={i} {...section} />
          case 'clientSlider':
            return <ClientSlider key={i} {...section} />
          default:
            return null
        }
      })}
    </>
  )
}