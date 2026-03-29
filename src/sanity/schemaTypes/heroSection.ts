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
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Wordt alleen gebruikt als er geen video is ingevuld',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
          description: 'Beschrijf de afbeelding voor slechtzienden en zoekmachines',
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube embed URL — heeft prioriteit boven afbeelding',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Hero: ${title}` }),
  },
})