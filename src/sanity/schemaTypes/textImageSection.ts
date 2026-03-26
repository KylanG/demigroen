import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'textImageSection',
  title: 'Tekst + Afbeelding Sectie',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel (H2)',
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
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagePosition',
      title: 'Afbeelding positie',
      type: 'string',
      options: {
        list: [
          { title: 'Afbeelding rechts', value: 'right' },
          { title: 'Afbeelding links', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Achtergrondkleur',
      type: 'string',
      options: {
        list: [
          { title: 'Geen achtergrond', value: 'none' },
          { title: 'Licht', value: 'light' },
          { title: 'Donker', value: 'dark' },
          { title: 'Accent', value: 'accent' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Tekst+Beeld: ${title}` }),
  },
})