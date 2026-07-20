import {defineType, defineField} from 'sanity'
import {SparklesIcon} from '@sanity/icons/Sparkles'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Banner',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'showPromoBadge',
      title: 'Show Promo Badge',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'promoBadgeText',
      title: 'Promo Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [
        'Shopify & Tienda Nube Partners',
        'Estructura Headless CMS',
        'Despliegue AWS Amplify CI/CD',
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroButton',
          title: 'Hero Button',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'href', title: 'Link (Anchor/URL)', type: 'string'},
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary (Gradiante Naranja/Rojo)', value: 'primary'},
                  {title: 'Secondary (Gris Oscuro)', value: 'secondary'},
                  {title: 'Tertiary (Línea Borde Neutral)', value: 'tertiary'},
                ],
              },
              initialValue: 'primary',
            },
          ],
        },
      ],
      initialValue: [
        {label: 'Cotiza tu proyecto', href: '#contact', style: 'primary'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Hero Banner',
        subtitle: 'Hero Banner Section',
        media: SparklesIcon,
      }
    },
  },
})
