import { defineType, defineField } from 'sanity'
import { ThListIcon } from '@sanity/icons/ThList'

export const servicesBlock = defineType({
  name: 'servicesBlock',
  title: 'Services Catalog',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Etiqueta Superior (Badge)',
      type: 'string',
      initialValue: 'Capacidades de Consultoría Digital',
    }),
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
      name: 'services',
      title: 'Services list',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Services Section',
        subtitle: 'Services Section',
        media: ThListIcon,
      }
    },
  },
})
