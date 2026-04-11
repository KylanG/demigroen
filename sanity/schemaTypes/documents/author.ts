import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'localizedText',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
})
