import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'

export const productHeroBlock = defineType({
  name: 'productHeroBlock',
  title: 'Product Hero (Landing de producto)',
  type: 'object',
  icon: RocketIcon,
  description: 'Hero reutilizable para landings de producto (CheckApp y futuros). No pertenece al sitio principal de Revenge.',
  fields: [
    defineField({
      name: 'productLogoLight',
      title: 'Logo del producto (versión clara)',
      type: 'image',
      description: 'Para usar sobre fondos oscuros.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Texto pequeño superior (ej. "Un producto de Revenge")',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline principal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Texto botón primario',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Link botón primario (ej. #cta-final)',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Texto botón secundario (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Link botón secundario (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'phoneMockupImage',
      title: 'Mockup de teléfono con la app (PLACEHOLDER pendiente)',
      type: 'image',
      description: 'Espacio reservado — imagen del teléfono con la pantalla de marcaje. Puede quedar vacío mientras se genera el asset.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'appStoreBadgeImage',
      title: 'Badge App Store (opcional, PLACEHOLDER)',
      type: 'image',
    }),
    defineField({
      name: 'playStoreBadgeImage',
      title: 'Badge Google Play (opcional, PLACEHOLDER)',
      type: 'image',
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: title || 'Untitled Product Hero', subtitle: 'Product Landing · Hero', media: RocketIcon}
    },
  },
})
