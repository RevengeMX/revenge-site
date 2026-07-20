import { defineType, defineField } from 'sanity'
import { HeartIcon } from '@sanity/icons/Heart'

export const clientesBlock = defineType({
  name: 'clientesBlock',
  title: 'Client Cases Grid',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
    }),
    defineField({
      name: 'clientCases',
      title: 'Client Case Studies list',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'cliente' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Case Studies Section',
        subtitle: 'Clientes Case Studies Section',
        media: HeartIcon,
      }
    },
  },
})
