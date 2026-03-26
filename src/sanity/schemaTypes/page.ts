import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'sections',
      title: 'Secties',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textImageSection' },
        { type: 'statsSection' },
        { type: 'ctaSection' },
        { type: 'clientSlider' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})