import { defineField, defineType } from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Gelokaliseerde tekst (kort)',
  type: 'object',
  fields: [
    defineField({
      name: 'nl',
      title: 'Nederlands',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'Engels',
      type: 'string',
    }),
  ],
})
