import { defineField, defineType } from 'sanity'

export const faqSection = defineType({
  name: 'faqBlock',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Sectiontitel',
      type: 'localizedString',
    }),
    defineField({
      name: 'items',
      title: 'Vragen & Antwoorden',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Vraag', type: 'localizedString' }),
            defineField({ name: 'answer', title: 'Antwoord', type: 'localizedText' }),
          ],
          preview: {
            select: { title: 'question.nl' },
            prepare: ({ title }) => ({ title: title ?? 'FAQ item' }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading.nl' },
    prepare: ({ title }) => ({ title: title ? `FAQ: ${title}` : 'FAQ' }),
  },
})
