import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'
import {ACCENT_COLOR_LIST} from '../../lib/accentColors'

export const productAudienceGridBlock = defineType({
  name: 'productAudienceGridBlock',
  title: 'Product: Para Quién Es (Audiencias)',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({name: 'title', title: 'Título de sección', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text'}),
    defineField({
      name: 'audiences',
      title: 'Perfiles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'audience',
          fields: [
            {name: 'profile', title: 'Perfil (ej. "Colaborador")', type: 'string'},
            {name: 'benefit', title: 'Qué gana con el producto', type: 'text'},
            {
              name: 'accentColor',
              title: 'Color de acento',
              type: 'string',
              options: {list: ACCENT_COLOR_LIST},
            },
          ],
          preview: {
            select: {title: 'profile', subtitle: 'benefit'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Untitled Audiencias', subtitle: 'Product Landing · Para Quién Es', media: UsersIcon}
    },
  },
})
