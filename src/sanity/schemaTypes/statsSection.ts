import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Statistieken Sectie',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel (optioneel)',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Statistieken',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Waarde', type: 'string', description: 'Bijv. 40% of 3 uur' },
            { name: 'label', title: 'Label', type: 'string', description: 'Bijv. Meer organisch bereik' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
})