import { defineField, defineType } from 'sanity'

export const textImageSection = defineType({
  name: 'textImageBlock',
  title: 'Tekst + Afbeelding',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Koptekst',
      type: 'localizedString',
      description: 'Optionele sectietitel boven de tekst.',
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'localizedText',
      description: 'De hoofdtekst naast de afbeelding.',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Afbeelding alt-tekst',
      type: 'localizedString',
      description: 'Beschrijving van de afbeelding voor schermlezers en SEO.',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Afbeeldingspositie',
      type: 'string',
      description: 'Bepaal of de afbeelding links of rechts van de tekst staat.',
      options: {
        list: [
          { title: 'Links', value: 'left' },
          { title: 'Rechts', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: { title: 'heading.nl', media: 'image' },
    prepare: ({ title, media }) => ({
      title: title ? `Tekst + Afbeelding: ${title}` : 'Tekst + Afbeelding',
      media,
    }),
  },
})
