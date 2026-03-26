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
      name: 'clients',
      title: 'Klanten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Klantnaam', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Slider: ${title ?? 'Klanten'}` }),
  },
})