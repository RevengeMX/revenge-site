import {defineType, defineField} from 'sanity'
import {DiamondIcon} from '@sanity/icons/Diamond'
import {ACCENT_COLOR_LIST} from '../../lib/accentColors'

export const productHighlightBlock = defineType({
  name: 'productHighlightBlock',
  title: 'Product: Diferenciador Destacado (ej. Cumplimiento)',
  type: 'object',
  icon: DiamondIcon,
  description: 'Sección propia para un diferenciador fuerte (ej. cumplimiento normativo). Se puede reutilizar para cualquier otro landing de producto.',
  fields: [
    defineField({name: 'badgeText', title: 'Texto de badge (ej. "Cumplimiento Normativo")', type: 'string'}),
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'description', title: 'Descripción', type: 'text'}),
    defineField({
      name: 'bullets',
      title: 'Puntos clave',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'accentColor',
      title: 'Color de acento',
      type: 'string',
      options: {list: ACCENT_COLOR_LIST},
      initialValue: '#fb2c36',
    }),
    defineField({
      name: 'badgeImage',
      title: 'Imagen / sello (opcional, PLACEHOLDER pendiente)',
      type: 'image',
      description: 'Ej. un sello o ícono de cumplimiento. Puede quedar vacío.',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Untitled Highlight', subtitle: 'Product Landing · Diferenciador', media: DiamondIcon}
    },
  },
})
