import { defineField, defineType } from 'sanity'

export const ctaBannerSection = defineType({
  name: 'ctaBannerBlock',
  title: 'CTA Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Koptekst',
      type: 'localizedString',
    }),
    defineField({
      name: 'subheading',
      title: 'Ondertitel',
      type: 'localizedText',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primaire knop',
      type: 'linkObject',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secundaire knop',
      type: 'linkObject',
    }),
    defineField({
      name: 'theme',
      title: 'Kleurthema',
      type: 'string',
      description: 'Primair = primaire merkkleur, Donker = donkere achtergrond, Licht = lichte achtergrond.',
      options: {
        list: [
          { title: 'Primair', value: 'primary' },
          { title: 'Donker', value: 'dark' },
          { title: 'Licht', value: 'light' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'heading.nl', subtitle: 'theme' },
    prepare: ({ title, subtitle }) => ({
      title: title ? `CTA Banner: ${title}` : 'CTA Banner',
      subtitle: subtitle ? `Thema: ${subtitle}` : undefined,
    }),
  },
})
