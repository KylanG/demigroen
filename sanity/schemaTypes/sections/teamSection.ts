import { defineField, defineType } from 'sanity'

export const teamSection = defineType({
  name: 'teamBlock',
  title: 'Team',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Sectiontitel',
      type: 'localizedString',
    }),
    defineField({
      name: 'subheading',
      title: 'Ondertitel',
      type: 'localizedText',
    }),
    defineField({
      name: 'members',
      title: 'Teamleden',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Volledige naam', type: 'string' }),
            defineField({
              name: 'role',
              title: 'Functie',
              type: 'localizedString',
              description: 'Functietitel van het teamlid.',
            }),
            defineField({ name: 'bio', title: 'Bio', type: 'localizedText' }),
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
            select: { title: 'name', subtitle: 'role.nl', media: 'photo' },
            prepare: ({ title, subtitle, media }) => ({
              title: title ?? 'Teamlid',
              subtitle,
              media,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading.nl' },
    prepare: ({ title }) => ({ title: title ? `Team: ${title}` : 'Team' }),
  },
})
