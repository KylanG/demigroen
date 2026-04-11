import { defineField, defineType } from 'sanity'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo alt-tekst',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Linkkolommen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Kolomtitel', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{ type: 'linkObject' }],
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Sociale media',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright tekst',
      type: 'string',
      description: 'Bijv. © 2025 Bedrijfsnaam. Alle rechten voorbehouden.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Footer Instellingen' }),
  },
})
