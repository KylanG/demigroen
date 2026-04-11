import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Categorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naam',
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
      name: 'description',
      title: 'Omschrijving',
      type: 'localizedText',
    }),
  ],
  preview: {
    select: { title: 'title.nl' },
  },
})
