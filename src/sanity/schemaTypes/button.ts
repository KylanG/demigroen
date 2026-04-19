import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Knop',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'De tekst die op de knop staat',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Gebruik een volledig adres (https://...) of een intern pad (/contact)',
    }),
    defineField({
      name: 'newTab',
      title: 'Openen in nieuw tabblad',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
