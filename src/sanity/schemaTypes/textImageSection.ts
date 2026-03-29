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
      name: 'hasBackground',
      title: 'Achtergrond',
      type: 'boolean',
      description: 'Zet aan voor de paarse achtergrond (zelfde kleur als de navigatiebalk)',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Tekst+Beeld: ${title}` }),
  },
})