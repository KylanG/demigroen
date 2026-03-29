import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Sitenaam',
      type: 'string',
      validation: (Rule) => Rule.required().error('Sitenaam is verplicht'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Wordt naast het logo getoond in de footer. Bijv. "BUILD. NOT BLEND."',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      description: 'Extra links in de footer, bijv. Privacyverklaring',
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
      type: 'button',
    }),
    defineField({
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
      description: 'Wordt gebruikt in de footer en op de contactpagina',
    }),
    defineField({
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
      description: 'Wordt gebruikt in de footer en op de contactpagina',
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