/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { PortableText, PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-body mt-10 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold text-body mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-body mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-5 py-1 my-6 text-muted italic leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-body leading-relaxed mb-5">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-1.5 text-body">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-1.5 text-body">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },

  marks: {
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary underline underline-offset-2 hover:opacity-80 transition-base"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-semibold text-body">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-background text-primary px-1.5 py-0.5 rounded-sm font-mono text-sm">
        {children}
      </code>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const alt = value.alt ?? ''
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-md">
            <Image
              src={urlFor(value).width(1200).height(675).fit('crop').url()}
              alt={alt}
              fill
              className="object-cover"
            />
          </div>
          {alt && (
            <figcaption className="mt-2 text-center text-sm text-muted">{alt}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export default function PortableTextRenderer({ value }: { value: any[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
