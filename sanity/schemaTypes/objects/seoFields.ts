import { defineField, defineType } from 'sanity'

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Titel',
      type: 'string',
      description: 'Valt terug op de paginatitel als leeg gelaten.',
    }),
    defineField({
      name: 'description',
      title: 'Meta beschrijving',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Houd de beschrijving onder 160 tekens.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Afbeelding',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Verberg voor zoekmachines (noIndex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
