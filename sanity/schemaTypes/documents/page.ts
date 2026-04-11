import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  groups: [
    { name: 'pagina', title: 'Pagina', default: true },
    { name: 'inhoud', title: 'Inhoud' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Tab: Pagina ───────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Titel (intern)',
      type: 'string',
      group: 'pagina',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'pagina',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero koptekst',
      type: 'localizedString',
      group: 'pagina',
      description: 'Laat leeg om de paginatitel als H1 te gebruiken.',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero subtekst',
      type: 'localizedText',
      group: 'pagina',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero afbeelding',
      type: 'image',
      group: 'pagina',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero afbeelding alt-tekst',
      type: 'localizedString',
      group: 'pagina',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primaire CTA knop',
      type: 'linkObject',
      group: 'pagina',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secundaire CTA knop',
      type: 'linkObject',
      group: 'pagina',
    }),

    // ── Tab: Inhoud ───────────────────────────────────────────────────
    defineField({
      name: 'blocks',
      title: 'Blokken',
      type: 'array',
      group: 'inhoud',
      of: [
        { type: 'richTextSection' },
        { type: 'textImageBlock' },
        { type: 'ctaBannerBlock' },
        { type: 'uspBlock' },
        { type: 'testimonialsBlock' },
        { type: 'faqBlock' },
        { type: 'teamBlock' },
        { type: 'contactBlock' },
      ],
    }),

    // ── Tab: SEO ──────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
