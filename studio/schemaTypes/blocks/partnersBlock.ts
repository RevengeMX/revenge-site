import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'

export const partnersBlock = defineType({
  name: 'partnersBlock',
  title: 'Partners Grid',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'partners',
      title: 'Partners list',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Partners Section',
        subtitle: 'Partners Grid Section',
        media: UsersIcon,
      }
    },
  },
})
