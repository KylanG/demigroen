import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaInstagram, FaFacebook, FaXTwitter, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { urlFor } from '@/sanity/lib/image'
interface FooterSettings {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo?: any
  logoAlt?: string
  siteName?: string
  description?: string
  ctaButton?: { label: string; href: string; blank?: boolean }
  menu1Title?: string
  menu1Links?: Array<{ label: string; href: string }>
  menu2Title?: string
  menu2Links?: Array<{ label: string; href: string }>
  socials?: {
    linkedin?: string
    instagram?: string
    facebook?: string
    twitter?: string
    tiktok?: string
    youtube?: string
  }
}

const socialLinks = [
  { key: 'linkedin',  label: 'LinkedIn',   Icon: FaLinkedin  },
  { key: 'instagram', label: 'Instagram',  Icon: FaInstagram },
  { key: 'facebook',  label: 'Facebook',   Icon: FaFacebook  },
  { key: 'twitter',   label: 'Twitter / X', Icon: FaXTwitter  },
  { key: 'tiktok',    label: 'TikTok',     Icon: FaTiktok    },
  { key: 'youtube',   label: 'YouTube',    Icon: FaYoutube   },
] as const

export default function Footer({ settings }: { settings: FooterSettings }) {
  const socials = settings?.socials

  return (
    <footer className="bg-primary text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Kolom 1: Logo + beschrijving + CTA */}
          <div className="lg:col-span-2">
            {settings?.logo ? (
              <Image
                src={urlFor(settings.logo).width(160).height(40).fit('max').url()}
                alt={settings.logoAlt ?? `${settings.siteName ?? 'Site'} logo`}
                width={160}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert mb-6"
              />
            ) : (
              <strong className="inline-block font-display text-white font-semibold text-2xl pb-4">
                {settings?.siteName ?? 'Site'}
              </strong>
            )}
            {settings?.description && (
              <p className="text-sm leading-relaxed mt-0 mb-0 pb-12">{settings.description}</p>
            )}
            {settings?.ctaButton?.label && settings?.ctaButton?.href && (
              <Link
                href={settings.ctaButton.href}
                target={settings.ctaButton.blank ? '_blank' : undefined}
                rel={settings.ctaButton.blank ? 'noopener noreferrer' : undefined}
                className="btn-primary inline-flex"
              >
                {settings.ctaButton.label}
              </Link>
            )}
          </div>

          {/* Kolom 2: Menu 1 */}
          {(settings?.menu1Title || settings?.menu1Links?.length) && (
            <nav aria-label={settings.menu1Title ?? 'Footer menu 1'}>
              <h3 className="text-white font-semibold mb-6">{settings.menu1Title}</h3>
              <ul className="space-y-3">
                {settings.menu1Links?.filter(link => link.href).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-white transition-base">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Kolom 3: Menu 2 */}
          {(settings?.menu2Title || settings?.menu2Links?.length) && (
            <nav aria-label={settings.menu2Title ?? 'Footer menu 2'}>
              <h3 className="text-white font-semibold mb-6">{settings.menu2Title}</h3>
              <ul className="space-y-3">
                {settings.menu2Links?.filter(link => link.href).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-white transition-base">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Kolom 4: Socials */}
          {socials && (
            <div>
              <h3 className="text-white font-semibold mb-6">Socials</h3>
              <ul className="flex gap-3">
                {socialLinks.map(({ key, label, Icon }) => {
                  const href = socials[key]
                  if (!href) return null
                  return (
                    <li key={key}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="hover:text-white transition-base"
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

        </div>

        {/* Credits bar */}
        <div className="py-8 text-sm text-white flex items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} {settings?.siteName ?? 'Site'}. Alle rechten voorbehouden.</span>
          <span>Built by{' '}
            <a
              href="https://seansupply.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SSUPPLY — portfolio van de ontwikkelaar"
              className="underline hover:text-white/80 transition-base"
            >
              SSUPPLY
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
