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
    defineField({
      name: 'buttonLabel',
      title: 'Texto del botón (opcional)',
      type: 'string',
      description: 'Si se deja vacío, no se muestra ningún botón.',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Enlace interno del botón',
      type: 'string',
      description: 'Redirect interno: ancla de la misma página (ej. #cta-final) o ruta del sitio (ej. /checkapp#funcionalidades).',
      hidden: ({parent}) => !parent?.buttonLabel,
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Estilo del botón',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Color de acento)', value: 'primary'},
          {title: 'Secondary (Gris Oscuro)', value: 'secondary'},
          {title: 'Tertiary (Línea Borde Neutral)', value: 'tertiary'},
        ],
      },
      initialValue: 'primary',
      hidden: ({parent}) => !parent?.buttonLabel,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Untitled Highlight', subtitle: 'Product Landing · Diferenciador', media: DiamondIcon}
    },
  },
})
