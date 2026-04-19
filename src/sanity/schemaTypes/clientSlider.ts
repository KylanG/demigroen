import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'clientSlider',
  title: 'Klanten Slider',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel (optioneel)',
      type: 'string',
    }),
    defineField({
      name: 'hasBackground',
      title: 'Paarse achtergrond',
      type: 'boolean',
      description: 'Zet aan voor de paarse achtergrond (zelfde kleur als de navigatiebalk). Logo\'s worden automatisch wit.',
      initialValue: true,
    }),
    defineField({
      name: 'logos',
      title: 'Afbeeldingen',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternatieve tekst',
              type: 'string',
              description: 'Bijv. "Logo van Bedrijfsnaam"',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Slider: ${title ?? 'Klanten'}` }),
  },
})