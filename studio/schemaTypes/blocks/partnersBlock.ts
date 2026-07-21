import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'

export const partnersBlock = defineType({
  name: 'partnersBlock',
  title: 'Partners Grid',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Etiqueta Superior (Badge)',
      type: 'string',
      initialValue: 'Sinergia Tecnológica',
    }),
    defineField({
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      initialValue: 'Nuestros Partners Oficiales',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Nota de Alianzas',
      type: 'text',
      initialValue: '* Alianzas directas con los líderes de la industria para asegurar soporte de primer nivel e implementaciones robustas.',
    }),
    defineField({
      name: 'partners',
      title: 'Lista de Partners',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
    }),
    defineField({
      name: 'integrationCalloutTitle',
      title: 'Título de la tarjeta de Integraciones',
      type: 'string',
      initialValue: '¿Usas otro ecosistema tecnológico?',
    }),
    defineField({
      name: 'integrationCalloutDescription',
      title: 'Descripción de la tarjeta de Integraciones',
      type: 'text',
      initialValue: 'Integramos ERPs locales, SAP, pasarelas de pago (Stripe, Mercado Pago) y sistemas CRM de forma segura.',
    }),
    defineField({
      name: 'integrationCalloutButtonLabel',
      title: 'Texto del Botón de Integraciones',
      type: 'string',
      initialValue: 'Consultar integraciones',
    }),
    defineField({
      name: 'integrationCalloutButtonLink',
      title: 'Enlace del Botón de Integraciones',
      type: 'string',
      initialValue: '#contact-section',
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
