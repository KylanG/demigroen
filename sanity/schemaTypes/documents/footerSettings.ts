import { defineField, defineType } from 'sanity'

const menuLinkObject = {
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Laat leeg om de paginatitel te gebruiken.',
    }),
    defineField({
      name: 'page',
      title: 'Pagina',
      type: 'reference',
      to: [{ type: 'page' }],
    }),
  ],
  preview: {
    select: { label: 'label', pageTitle: 'page.title' },
    prepare: ({ label, pageTitle }: { label?: string; pageTitle?: string }) => ({
      title: label || pageTitle || 'Naamloos',
    }),
  },
}

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo alt-tekst',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte tekst onder het logo in de footer.',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Knop',
      type: 'linkObject',
    }),
    defineField({
      name: 'menu1Title',
      title: 'Menu 1 — Titel',
      type: 'string',
    }),
    defineField({
      name: 'menu1Links',
      title: 'Menu 1 — Links',
      type: 'array',
      of: [menuLinkObject],
    }),
    defineField({
      name: 'menu2Title',
      title: 'Menu 2 — Titel',
      type: 'string',
    }),
    defineField({
      name: 'menu2Links',
      title: 'Menu 2 — Links',
      type: 'array',
      of: [menuLinkObject],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Footer Instellingen' }),
  },
})
