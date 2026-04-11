import { defineField, defineType } from 'sanity'

export const testimonialsSection = defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Sectiontitel',
      type: 'localizedString',
    }),
    defineField({
      name: 'testimonials',
      title: 'Klantervaringen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Naam', type: 'string' }),
            defineField({ name: 'role', title: 'Functietitel', type: 'string' }),
            defineField({ name: 'company', title: 'Bedrijf', type: 'string' }),
            defineField({ name: 'quote', title: 'Citaat', type: 'localizedText' }),
            defineField({
              name: 'photo',
              title: 'Profielfoto',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'photoAlt',
              title: 'Foto alt-tekst',
              type: 'string',
              description: 'Beschrijving van de foto voor toegankelijkheid.',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'company', media: 'photo' },
            prepare: ({ title, subtitle, media }) => ({
              title: title ?? 'Testimonial',
              subtitle: subtitle,
              media,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading.nl' },
    prepare: ({ title }) => ({ title: title ? `Testimonials: ${title}` : 'Testimonials' }),
  },
})
