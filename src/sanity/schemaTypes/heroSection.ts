import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Sectie',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel (H1)',
      type: 'string',
      validation: (Rule) => Rule.required().error('De hero heeft een titel nodig'),
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'text',
      description: 'Korte inleidende tekst onder de titel',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primaire Knop',
      type: 'button',
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secundaire Knop',
      type: 'button',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Hero: ${title}` }),
  },
})