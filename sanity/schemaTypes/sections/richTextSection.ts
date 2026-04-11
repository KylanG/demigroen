import { defineField, defineType } from 'sanity'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rijke tekst',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      description: 'Vrije tekst met opmaak: koppen, lijsten, links, afbeeldingen, citaten.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt-tekst',
              type: 'string',
              description: 'Beschrijving van de afbeelding voor toegankelijkheid en SEO.',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { content: 'content' },
    prepare: ({ content }) => {
      const block = (content ?? []).find((b: { _type: string }) => b._type === 'block')
      const text = block?.children?.map((c: { text: string }) => c.text).join('') ?? ''
      return {
        title: 'Rijke tekst',
        subtitle: text ? text.slice(0, 60) + (text.length > 60 ? '…' : '') : 'Leeg',
      }
    },
  },
})
