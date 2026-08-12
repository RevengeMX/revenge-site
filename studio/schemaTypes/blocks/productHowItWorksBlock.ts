import {defineType, defineField} from 'sanity'
import {CheckmarkCircleIcon} from '@sanity/icons/CheckmarkCircle'

export const productHowItWorksBlock = defineType({
  name: 'productHowItWorksBlock',
  title: 'Product: Cómo Funciona (Pasos)',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({name: 'title', title: 'Título de sección', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text'}),
    defineField({
      name: 'steps',
      title: 'Pasos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            {name: 'title', title: 'Título del paso', type: 'string'},
            {name: 'description', title: 'Descripción', type: 'text'},
          ],
          preview: {
            select: {title: 'title'},
          },
        },
      ],
      validation: (rule) => rule.max(5),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Untitled Cómo Funciona', subtitle: 'Product Landing · Cómo Funciona', media: CheckmarkCircleIcon}
    },
  },
})
