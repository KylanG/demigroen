import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSettings',
  title: 'Hero Sectie',
  type: 'document',
  fields: [
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'Direct .mp4 URL (bijv. Cloudinary) of YouTube embed URL. Heeft prioriteit boven de afbeelding.',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Wordt gebruikt als er geen video is ingevuld.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hero Sectie' }
    },
  },
})
