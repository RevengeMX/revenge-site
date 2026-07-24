import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'

export const currentClientsBlock = defineType({
  name: 'currentClientsBlock',
  title: 'Current Clients Carousel',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Empresas que confían en nosotros',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'clients',
      title: 'Clientes (logos)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'currentClient' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      clients: 'clients',
    },
    prepare({ title, clients }) {
      return {
        title: title || 'Untitled Clients Carousel',
        subtitle: `${(clients || []).length} cliente(s)`,
        media: UsersIcon,
      }
    },
  },
})
