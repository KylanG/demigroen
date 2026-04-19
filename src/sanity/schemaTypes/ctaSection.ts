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
      type: 'button',
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secundaire Knop (optioneel)',
      type: 'button',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `CTA: ${title}` }),
  },
})