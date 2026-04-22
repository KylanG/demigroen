import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Algemene Instellingen',
  type: 'document',
  groups: [
    { name: 'algemeen', title: 'Algemeen', default: true },
    { name: 'socialmedia', title: 'Social Media' },
    { name: 'analytics', title: 'Analytics' },
    { name: 'seo', title: 'SEO' },
    { name: 'notfound', title: '404-pagina' },
  ],
  fields: [
    // ── Tab: Algemeen ─────────────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Sitenaam',
      type: 'string',
      group: 'algemeen',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'algemeen',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo alt-tekst',
      type: 'string',
      group: 'algemeen',
    }),
    defineField({
      name: 'faviconBase',
      title: 'Favicon bronafbeelding',
      type: 'image',
      group: 'algemeen',
      description: 'Hoge-resolutie bronafbeelding (bijv. SVG of PNG 512×512).',
    }),
    defineField({
      name: 'faviconIco',
      title: 'Favicon ICO (16×16 / 32×32)',
      type: 'image',
      group: 'algemeen',
      description: 'Wordt als standaard browser-favicon gebruikt.',
    }),
    defineField({
      name: 'appleTouchIcon',
      title: 'Apple Touch Icon (180×180)',
      type: 'image',
      group: 'algemeen',
      description: 'Wordt gebruikt als app-icoon op iOS-apparaten.',
    }),
    defineField({
      name: 'webmanifestIcon',
      title: 'Webmanifest-icoon (192×192 / 512×512)',
      type: 'image',
      group: 'algemeen',
      description: 'Wordt gebruikt in het webmanifest voor Android/PWA.',
    }),

    // ── Tab: Social Media ─────────────────────────────────────────────
    defineField({
      name: 'socials',
      title: 'Sociale media',
      type: 'object',
      group: 'socialmedia',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
      ],
    }),

    // ── Tab: Analytics ────────────────────────────────────────────────
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      group: 'analytics',
      description: 'Bijv. GTM-XXXXXXX',
    }),
    defineField({
      name: 'ga4Id',
      title: 'Google Analytics 4 ID',
      type: 'string',
      group: 'analytics',
      description: 'Bijv. G-XXXXXXXXXX. Alleen actief als geen GTM ID is ingesteld.',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Site Verificatie',
      type: 'string',
      group: 'analytics',
      description: 'Wordt als meta tag in <head> gezet.',
    }),

    // ── Tab: SEO ──────────────────────────────────────────────────────
    defineField({
      name: 'siteNoIndex',
      title: 'Verberg hele site voor zoekmachines',
      type: 'boolean',
      group: 'seo',
      initialValue: true,
      description: 'Zoekmachines worden gevraagd de site niet te indexeren. Schakel dit uit zodra de site live gaat.',
    }),
    defineField({
      name: 'seo',
      title: 'Globale SEO (fallback)',
      type: 'seoFields',
      group: 'seo',
    }),

    // ── Tab: 404-pagina ───────────────────────────────────────────────
    defineField({
      name: 'notFoundTitle',
      title: 'Paginatitel',
      type: 'localizedString',
      group: 'notfound',
    }),
    defineField({
      name: 'notFoundText',
      title: 'Tekst',
      type: 'localizedText',
      group: 'notfound',
    }),
    defineField({
      name: 'notFoundCta',
      title: 'Knop',
      type: 'linkObject',
      group: 'notfound',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
