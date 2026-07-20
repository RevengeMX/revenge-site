import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'content',
      title: 'Page Content',
      default: true,
    },
    {
      name: 'image',
      title: 'Logos & iconos',
    },
  ],
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Fallback Text',
      type: 'string',
      initialValue: 'REVENGE',
      group: 'content',
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo Light (For Dark Background)',
      type: 'image',
      options: {hotspot: true},
      group: 'image',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo Dark (For Light Background)',
      type: 'image',
      options: {hotspot: true},
      group: 'image',
    }),
    defineField({
      name: 'logoIcon',
      title: 'Logo Icon (Symbol/Icon representation)',
      type: 'image',
      options: {hotspot: true},
      group: 'image',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'image',
    }),
    defineField({
      name: 'logoHeightDesktop',
      title: 'Logo Height on Desktop (in pixels)',
      type: 'number',
      group: 'image',
      initialValue: 28,
      validation: (rule) => rule.min(10).max(100),
    }),
    defineField({
      name: 'logoHeightMobile',
      group: 'image',
      title: 'Logo Height on Mobile (in pixels)',
      type: 'number',
      initialValue: 24,
      validation: (rule) => rule.min(10).max(100),
    }),
    defineField({
      name: 'navItems',
      title: 'Header Navigation Menu',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'href', title: 'Link (Anchor/URL)', type: 'string'},
          ],
        },
      ],
      initialValue: [
        {label: 'Servicios', href: '#services-section'},
        {name: 'Partners', href: '#partners-section'},
        {label: 'Clientes', href: '#clientes-section'},
      ],
    }),
    defineField({
      name: 'footerNavItems',
      title: 'Footer Navigation Menu',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'href', title: 'Link (Anchor/URL)', type: 'string'},
          ],
        },
      ],
      initialValue: [
        {label: 'Aviso de Privacidad', href: '#privacy'},
        {label: 'Términos y Condiciones', href: '#terms'},
        {label: 'Contacto', href: '#contact-section'},
      ],
    }),
    defineField({
      name: 'headerCta',
      title: 'Header CTA Button',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'href', title: 'Link (Anchor/URL)', type: 'string'},
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Enlace Interno (Anchor / Ancla)', value: 'internal'},
                  {title: 'Enlace Externo (Nueva Pestaña / Target Blank)', value: 'external'},
                ],
              },
              initialValue: 'internal',
            },
          ],
        },
      ],
      initialValue: [
        {
          label: 'Cotizar Proyecto',
          href: '#contact-section',
          linkType: 'internal',
        },
      ],
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Brand Description',
      type: 'text',
      group: 'content',
      initialValue:
        'Consultoría empresarial digital especializada en desarrollo moderno, diseño responsivo, investigación de mercados e integraciones omnicanal con Shopify, Tienda Nube y Contentful. CMS Base: Sanity.',
    }),
    defineField({
      name: 'complianceText',
      title: 'Footer Compliance Text',
      type: 'text',
      group: 'content',
      initialValue:
        'El sitio implementa buffers unificados para Google Tag Manager, Facebook Pixel y píxeles de remarketing bajo regulaciones de privacidad. Cumplimiento de RGPD / CCPA configurado mediante GTM Consent Mode v2.',
    }),
  ],
})
