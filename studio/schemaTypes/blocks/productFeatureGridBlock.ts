import {defineType, defineField} from 'sanity'
import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {ACCENT_COLOR_LIST} from '../../lib/accentColors'

export const productFeatureGridBlock = defineType({
  name: 'productFeatureGridBlock',
  title: 'Product: Grid de Funcionalidades (numeradas)',
  type: 'object',
  icon: ThLargeIcon,
  description: 'Tarjetas numeradas tipo "01–06". Usa una instancia por grupo (ej. "App Móvil" y otra para "Panel Web").',
  fields: [
    defineField({name: 'title', title: 'Título de sección', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text'}),
    defineField({
      name: 'features',
      title: 'Funcionalidades',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {name: 'description', title: 'Descripción', type: 'text'},
            {
              name: 'accentColor',
              title: 'Color de acento',
              type: 'string',
              options: {list: ACCENT_COLOR_LIST},
            },
            {
              name: 'icon',
              title: 'Ícono (PLACEHOLDER pendiente, línea simple)',
              type: 'image',
              description: 'Espacio reservado para el set de íconos por funcionalidad.',
            },
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', features: 'features'},
    prepare({title, features}) {
      return {
        title: title || 'Untitled Feature Grid',
        subtitle: `Product Landing · ${(features || []).length} funcionalidad(es)`,
        media: ThLargeIcon,
      }
    },
  },
})
