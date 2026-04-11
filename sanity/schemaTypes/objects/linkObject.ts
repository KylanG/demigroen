import { defineField, defineType } from 'sanity'

export const linkObject = defineType({
  name: 'linkObject',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blank',
      title: 'Openen in nieuw tabblad',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
