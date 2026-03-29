import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default function ClientSlider({ heading, logos, hasBackground = true }: any) {
  if (!logos?.length) return null

  // Duplicate logos so the marquee loops seamlessly
  const track = [...logos, ...logos]

  const bg = hasBackground ? 'bg-[#8B1A5E]' : 'bg-white'
  const headingColor = hasBackground ? 'text-white' : 'text-[#8B1A5E]'
  const fadeFrom = hasBackground ? 'from-[#8B1A5E]' : 'from-white'
  const logoFilter = hasBackground ? 'brightness-0 invert' : 'grayscale hover:grayscale-0'

  return (
    <section className={`w-full py-16 ${bg} overflow-hidden`}>

      {heading && (
        <h2 className={`text-2xl md:text-3xl font-bold ${headingColor} text-center mb-12 px-8`}>
          {heading}
        </h2>
      )}

      {/* Fade edges */}
      <div className="relative">
        <div className={`pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r ${fadeFrom} to-transparent`} />
        <div className={`pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l ${fadeFrom} to-transparent`} />

        {/* Scrolling track */}
        <div className="flex animate-marquee w-max">
          {track.map((logo: any, i: number) => (
            <div key={i} className={`relative h-12 w-40 mx-10 shrink-0 transition duration-300 ${logoFilter}`}>
              <Image
                src={urlFor(logo).url()}
                alt={logo.alt ?? ''}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
