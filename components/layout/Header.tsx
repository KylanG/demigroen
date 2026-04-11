/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { urlFor } from '@/sanity/lib/image'

interface HeaderSettings {
  logo?: any
  logoAlt?: string
  navigation?: Array<{ label: string; href: string; blank: boolean }>
  ctaButton?: { label: string; href: string; blank: boolean }
}

export default function Header({ settings }: { settings: HeaderSettings }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = settings?.navigation ?? []
  const cta = settings?.ctaButton

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            {settings?.logo ? (
              <Image
                src={urlFor(settings.logo).width(160).height(40).fit('max').url()}
                alt={settings.logoAlt ?? 'Logo'}
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="font-bold text-xl text-primary">SSUPPLY</span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.blank ? '_blank' : undefined}
                rel={link.blank ? 'noopener noreferrer' : undefined}
                className={`text-sm font-medium transition-base hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-body'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            {cta && (
              <Link
                href={cta.href}
                target={cta.blank ? '_blank' : undefined}
                rel={cta.blank ? 'noopener noreferrer' : undefined}
                className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-base"
              >
                {cta.label}
              </Link>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-sm text-body hover:bg-background transition-base"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu openen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-4 pt-2 space-y-1">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.blank ? '_blank' : undefined}
              rel={link.blank ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-sm text-sm font-medium transition-base ${
                pathname === link.href
                  ? 'text-primary bg-primary/10'
                  : 'text-body hover:bg-background'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              target={cta.blank ? '_blank' : undefined}
              rel={cta.blank ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              className="block mt-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium text-center"
            >
              {cta.label}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
