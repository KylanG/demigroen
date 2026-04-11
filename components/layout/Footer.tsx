/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import { urlFor } from '@/sanity/lib/image'

interface FooterSettings {
  logo?: any
  logoAlt?: string
  columns?: Array<{
    title: string
    links: Array<{ label: string; href: string; blank: boolean }>
  }>
  socials?: {
    linkedin?: string
    instagram?: string
    facebook?: string
    twitter?: string
  }
  copyright?: string
}

export default function Footer({ settings }: { settings: FooterSettings }) {
  const columns = settings?.columns ?? []
  const socials = settings?.socials

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo kolom */}
          <div className="space-y-4">
            {settings?.logo ? (
              <Image
                src={urlFor(settings.logo).width(160).height(40).fit('max').url()}
                alt={settings.logoAlt ?? 'Logo'}
                width={160}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            ) : (
              <span className="font-bold text-xl text-white">SSUPPLY</span>
            )}

            {/* Socials */}
            {socials && (
              <div className="flex gap-3 pt-2">
                {socials.linkedin && (
                  <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-base">
                    <FaLinkedin className="w-5 h-5" />
                  </Link>
                )}
                {socials.instagram && (
                  <Link href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-base">
                    <FaInstagram className="w-5 h-5" />
                  </Link>
                )}
                {socials.facebook && (
                  <Link href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-base">
                    <FaFacebook className="w-5 h-5" />
                  </Link>
                )}
                {socials.twitter && (
                  <Link href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-base">
                    <FaXTwitter className="w-5 h-5" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Link kolommen */}
          {columns.map((col, i) => (
            <div key={i}>
              <h3 className="text-white font-semibold mb-3">{col.title}</h3>
              <ul className="space-y-2">
                {col.links?.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.blank ? '_blank' : undefined}
                      rel={link.blank ? 'noopener noreferrer' : undefined}
                      className="text-sm hover:text-white transition-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center text-gray-500">
          {settings?.copyright ?? `© ${new Date().getFullYear()} SSUPPLY. Alle rechten voorbehouden.`}
        </div>
      </div>
    </footer>
  )
}
