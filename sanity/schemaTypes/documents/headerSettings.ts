import { defineField, defineType } from 'sanity'

export const headerSettings = defineType({
  name: 'headerSettings',
  title: 'Header Instellingen',
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
      name: 'navigation',
      title: 'Navigatielinks',
      type: 'array',
      of: [{ type: 'linkObject' }],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Knop',
      type: 'linkObject',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Header Instellingen' }),
  },
})
