/**
 * TypeScript interfaces voor alle page builder sections.
 * Elke interface correspondeert 1-op-1 met een Sanity section schema.
 *
 * Naamgeving: de Sanity `_type` waarde (bijv. 'textImageBlock') is bewust
 * behouden voor database-compatibiliteit. Component bestanden gebruiken
 * de 'Section' suffix voor duidelijkheid.
 */

// ── Shared primitives ────────────────────────────────────────────────────────

export interface LocalizedString {
  nl: string
  en?: string
}

export interface LocalizedText {
  nl: string
  en?: string
}

export interface LinkObject {
  label: string
  href: string
  blank?: boolean
}

export interface SanityImageAsset {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

// ── Section base ─────────────────────────────────────────────────────────────

export interface SectionBase {
  _key: string
  _type: string
}

// ── Section types ────────────────────────────────────────────────────────────

export interface TextImageSection extends SectionBase {
  _type: 'textImageBlock'
  heading?: LocalizedString
  text?: LocalizedText
  image?: SanityImageAsset
  imageAlt?: LocalizedString
  imagePosition?: 'left' | 'right'
}

export interface CtaBannerSection extends SectionBase {
  _type: 'ctaBannerBlock'
  heading?: LocalizedString
  subheading?: LocalizedText
  primaryCta?: LinkObject
  secondaryCta?: LinkObject
  theme?: 'primary' | 'dark' | 'light'
}

export interface UspItem {
  _key: string
  icon?: string
  title?: LocalizedString
  text?: LocalizedText
}

export interface UspSection extends SectionBase {
  _type: 'uspBlock'
  heading?: LocalizedString
  usps?: UspItem[]
}

export interface TestimonialItem {
  _key: string
  name?: string
  role?: string
  company?: string
  quote?: LocalizedText
  photo?: SanityImageAsset
  photoAlt?: string
}

export interface TestimonialsSection extends SectionBase {
  _type: 'testimonialsBlock'
  heading?: LocalizedString
  testimonials?: TestimonialItem[]
}

export interface FaqItem {
  _key: string
  question?: LocalizedString
  answer?: LocalizedText
}

export interface FaqSection extends SectionBase {
  _type: 'faqBlock'
  heading?: LocalizedString
  items?: FaqItem[]
}

export interface TeamMember {
  _key: string
  name?: string
  role?: LocalizedString
  bio?: LocalizedText
  photo?: SanityImageAsset
  photoAlt?: string
}

export interface TeamSection extends SectionBase {
  _type: 'teamBlock'
  heading?: LocalizedString
  subheading?: LocalizedText
  members?: TeamMember[]
}

export interface ContactSection extends SectionBase {
  _type: 'contactBlock'
  heading?: LocalizedString
  subheading?: LocalizedText
}

export interface RichTextSection extends SectionBase {
  _type: 'richTextSection'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[]
}

// ── Hero (flat page-level, not a blocks-array section) ───────────────────────

export interface HeroData {
  title: string
  heroHeading?: LocalizedString
  heroSubheading?: LocalizedText
  heroImage?: SanityImageAsset
  heroImageAlt?: LocalizedString
  heroVideo?: string
  heroPrimaryCta?: LinkObject
  heroSecondaryCta?: LinkObject
}

// ── Union type for all sections ───────────────────────────────────────────────

export type PageSection =
  | TextImageSection
  | CtaBannerSection
  | UspSection
  | TestimonialsSection
  | FaqSection
  | TeamSection
  | ContactSection
  | RichTextSection
