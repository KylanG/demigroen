import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { notFoundQuery } from '@/sanity/lib/queries'
import { getLang } from '@/lib/i18n'

export default async function NotFound() {
  let data = null
  try {
    data = await client.fetch(notFoundQuery)
  } catch {
    // No Sanity project configured yet
  }

  const title = getLang(data?.notFoundTitle) || 'Pagina niet gevonden'
  const text = getLang(data?.notFoundText) || 'De pagina die je zoekt bestaat niet of is verplaatst.'
  const cta = data?.notFoundCta ?? { label: 'Terug naar home', href: '/' }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-7xl font-bold text-primary">404</p>
        <h1 className="text-3xl font-bold text-body">{title}</h1>
        <p className="text-muted leading-relaxed">{text}</p>
        {cta?.href && (
          <Link
            href={cta.href}
            target={cta.blank ? '_blank' : undefined}
            rel={cta.blank ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-base"
          >
            {cta.label || 'Terug naar home'}
          </Link>
        )}
      </div>
    </div>
  )
}
