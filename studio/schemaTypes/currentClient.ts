import { defineType, defineField } from 'sanity'

export const currentClient = defineType({
  name: 'currentClient',
  title: 'Current Client (Logo)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Sitio web (opcional)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled Client',
        media,
      }
    },
  },
})
