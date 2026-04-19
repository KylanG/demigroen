import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Header Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigation',
      title: 'Header Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Primaire Button',
      type: 'button',
    }),
    defineField({
      name: 'showSecondaryButton',
      title: 'Tweede button inschakelen',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Tweede Button',
      type: 'button',
      hidden: ({ document }) => !document?.showSecondaryButton,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Header Instellingen' }
    },
  },
})
