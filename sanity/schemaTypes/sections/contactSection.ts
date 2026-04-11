import { defineField, defineType } from 'sanity'

export const contactSection = defineType({
  name: 'contactBlock',
  title: 'Contactformulier',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Formuliertitel',
      type: 'localizedString',
      description: 'Titel boven het contactformulier.',
    }),
    defineField({
      name: 'subheading',
      title: 'Ondertitel',
      type: 'localizedText',
      description: 'Korte introductietekst onder de titel.',
    }),
  ],
  preview: {
    select: { title: 'heading.nl' },
    prepare: ({ title }) => ({ title: title ? `Contactformulier: ${title}` : 'Contactformulier' }),
  },
})
