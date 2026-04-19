import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
      validation: (Rule) => Rule.required().error('Een paginatitel is verplicht'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required().error('Een slug is verplicht — klik op "Genereren"'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Titel',
          type: 'string',
          description: 'Aanbevolen: max. 60 tekens. Laat leeg om de paginatitel te gebruiken.',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Beschrijving',
          type: 'text',
          rows: 3,
          description: 'Aanbevolen: max. 160 tekens. Wordt getoond in zoekresultaten.',
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Media Afbeelding',
          type: 'image',
          options: { hotspot: true },
          description: 'Afbeelding die wordt getoond bij het delen op social media. Aanbevolen: 1200×630px.',
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Sectie',
      type: 'heroSection',
      validation: (Rule) => Rule.required().error('Elke pagina heeft een hero sectie nodig'),
    }),
    defineField({
      name: 'sections',
      title: 'Secties',
      type: 'array',
      description: 'Voeg hier extra secties toe onder de hero',
      of: [
        { type: 'textImageSection' },
        { type: 'statsSection' },
        { type: 'ctaSection' },
        { type: 'clientSlider' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})