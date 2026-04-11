import { defineField, defineType } from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Gelokaliseerde tekst (lang)',
  type: 'object',
  fields: [
    defineField({
      name: 'nl',
      title: 'Nederlands',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'Engels',
      type: 'text',
    }),
  ],
})
