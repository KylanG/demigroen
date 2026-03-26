import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Sectie',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primaire Knop',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secundaire Knop (optioneel)',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `CTA: ${title}` }),
  },
})