import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footerSettings',
  title: 'Footer Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Wordt wit weergegeven in de footer',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'button',
      title: 'Knop',
      type: 'button',
    }),
    defineField({
      name: 'menu1Title',
      title: 'Menu 1 Titel',
      type: 'string',
    }),
    defineField({
      name: 'menu1Items',
      title: 'Menu 1 Items',
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
      name: 'menu2Title',
      title: 'Menu 2 Titel',
      type: 'string',
    }),
    defineField({
      name: 'menu2Items',
      title: 'Menu 2 Items',
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
      name: 'socials',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'menu1Title' },
    prepare() {
      return { title: 'Footer Instellingen' }
    },
  },
})
