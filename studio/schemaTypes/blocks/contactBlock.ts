import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Form Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Contact Section',
        subtitle: 'Contact Form Section',
        media: EnvelopeIcon,
      }
    },
  },
})
