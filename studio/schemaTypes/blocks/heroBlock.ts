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
    defineField({
      name: 'visualType',
      title: 'Elemento Visual',
      type: 'string',
      description: 'Si no eliges nada, el Hero se muestra solo con texto.',
      options: {
        list: [
          {title: 'Ninguno', value: 'none'},
          {title: 'Imagen', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Interactivo (Code Card 3D)', value: 'interactive'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'visualImage',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.visualType !== 'image',
    }),
    defineField({
      name: 'visualVideoFile',
      title: 'Video (archivo subido)',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.visualType !== 'video',
    }),
    defineField({
      name: 'visualVideoUrl',
      title: 'Video (URL externa)',
      type: 'url',
      description: 'Alternativa a subir un archivo: liga a un .mp4, YouTube o Vimeo. Si subes un archivo, el archivo tiene prioridad.',
      hidden: ({parent}) => parent?.visualType !== 'video',
    }),
    defineField({
      name: 'visualPosition',
      title: 'Posición del Elemento Visual',
      type: 'string',
      options: {
        list: [
          {title: 'Fondo del Hero', value: 'background'},
          {title: 'Derecha del texto', value: 'right'},
          {title: 'Izquierda del texto', value: 'left'},
          {title: 'Abajo del texto', value: 'below'},
        ],
      },
      initialValue: 'below',
      hidden: ({parent}) => !parent?.visualType || parent.visualType === 'none',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {visualType?: string} | undefined
          if (parent?.visualType === 'interactive' && value === 'background') {
            return 'El elemento interactivo no puede usarse como fondo. Elige derecha, izquierda o abajo.'
          }
          return true
        }),
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
