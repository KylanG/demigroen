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
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'text',
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
      title: 'Secundaire Knop',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Afbeelding', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo of directe video URL',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Hero: ${title}` }),
  },
})