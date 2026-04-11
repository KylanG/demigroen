import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blogpost',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.nl' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Omslagafbeelding',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Samenvatting',
      type: 'localizedText',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Gepubliceerd op',
      type: 'datetime',
    }),
    defineField({
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'body',
      title: 'Inhoud',
      type: 'array',
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
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: { title: 'title.nl', subtitle: 'publishedAt', media: 'coverImage' },
  },
})
