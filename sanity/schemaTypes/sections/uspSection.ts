import { defineField, defineType } from 'sanity'

export const uspSection = defineType({
  name: 'uspBlock',
  title: "USP's",
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Sectiontitel',
      type: 'localizedString',
    }),
    defineField({
      name: 'usps',
      title: 'Unique Selling Points',
      type: 'array',
      description: 'Voeg de belangrijkste voordelen of kenmerken toe.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icoon (emoji)',
              type: 'string',
              description: 'Plak een emoji als visueel icoon, bijv. ⚡ of 🎯.',
            }),
            defineField({ name: 'title', title: 'Titel', type: 'localizedString' }),
            defineField({ name: 'text', title: 'Omschrijving', type: 'localizedText' }),
          ],
          preview: {
            select: { title: 'title.nl', subtitle: 'icon' },
            prepare: ({ title, subtitle }) => ({
              title: title ?? 'USP',
              subtitle: subtitle,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading.nl' },
    prepare: ({ title }) => ({ title: title ? `USP's: ${title}` : "USP's" }),
  },
})
