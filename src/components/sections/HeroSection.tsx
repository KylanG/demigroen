import { urlFor } from '@/sanity/image'
import Image from 'next/image'
import Container from '@/components/Container'

export default function HeroSection({ heading, text, primaryButton, secondaryButton, image, video }: any) {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">

      {/* Achtergrond video of afbeelding */}
      {video ? (
        video.includes('/embed/') ? (
          // YouTube iframe fallback
          <iframe
            src={`${video.replace('youtube.com', 'youtube-nocookie.com')}?controls=0&modestbranding=1&rel=0&showinfo=0&autoplay=1&mute=1&loop=1&playlist=${video.split('/embed/')[1]}`}
            title="Achtergrond video"
            className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            allowFullScreen
          />
        ) : (
          // Self-hosted .mp4 (Cloudinary, Mux, etc.)
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          >
            <source src={video} type="video/mp4" />
          </video>
        )
      ) : image ? (
        <Image
          src={urlFor(image).url()}
          alt={heading ?? ''}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}

      {/* Donkere overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <Container className="relative z-10 flex flex-col justify-center h-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{heading}</h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl">{text}</p>

          {/* Buttons */}
          <div className="flex flex-row gap-4">
            {primaryButton?.label && primaryButton?.url && (
              <a
                href={primaryButton.url}
                className="bg-pink-500 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-600 transition"
              >
                {primaryButton.label}
              </a>
            )}
            {secondaryButton?.label && secondaryButton?.url && (
              <a
                href={secondaryButton.url}
                className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition"
              >
                {secondaryButton.label}
              </a>
            )}
          </div>
        </div>
      </Container>

    </section>
  )
}