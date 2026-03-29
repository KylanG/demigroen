import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import Container from '@/components/Container'

export default function TextImageSection({
  heading,
  text,
  primaryButton,
  secondaryButton,
  image,
  imagePosition = 'right',
  hasBackground = false,
}: any) {
  const isImageLeft = imagePosition === 'left'
  const dark = hasBackground

  return (
    <section className={`w-full py-20 ${dark ? 'bg-[#8B1A5E]' : 'bg-white'}`}>
      <Container>
      <div
        className={`flex flex-col ${
          isImageLeft ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center gap-12`}
      >

        {/* Text content */}
        <div className="flex-1">
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-[#8B1A5E]'}`}>
              {heading}
            </h2>
          )}
          {text && (
            <p className={`text-base leading-relaxed mb-8 ${dark ? 'text-white/80' : 'text-gray-700'}`}>
              {text}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {primaryButton?.label && primaryButton?.url && (
              <a
                href={primaryButton.url}
                target={primaryButton.newTab ? '_blank' : '_self'}
                rel={primaryButton.newTab ? 'noopener noreferrer' : undefined}
                className="bg-pink-500 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-600 transition"
              >
                {primaryButton.label}
              </a>
            )}
            {secondaryButton?.label && secondaryButton?.url && (
              <a
                href={secondaryButton.url}
                target={secondaryButton.newTab ? '_blank' : '_self'}
                rel={secondaryButton.newTab ? 'noopener noreferrer' : undefined}
                className={`border px-6 py-3 rounded-full font-medium transition ${
                  dark
                    ? 'border-white text-white hover:bg-white hover:text-[#8B1A5E]'
                    : 'border-[#8B1A5E] text-[#8B1A5E] hover:bg-[#8B1A5E] hover:text-white'
                }`}
              >
                {secondaryButton.label}
              </a>
            )}
          </div>
        </div>

        {/* Image */}
        {image && (
          <div className="flex-1 relative w-full min-h-[300px] md:min-h-[420px] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={image.alt ?? heading ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}

      </div>
      </Container>
    </section>
  )
}
