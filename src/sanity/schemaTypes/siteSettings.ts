import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Sitenaam',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigation',
      title: 'Navigatie',
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
      title: 'CTA Knop (nav)',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
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
    select: { title: 'siteName' },
  },
})