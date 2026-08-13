import { defineType, defineField } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Partner',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Rol / Categoría (ej: E-commerce Partner)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'logoImage',
      title: 'Imagen del Logo (Subir archivo)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Imagen/Logo personalizado de la empresa partner. Si se sube una imagen, tendrá prioridad sobre los iconos predeterminados.',
    }),
    defineField({
      name: 'logoType',
      title: 'Icono Predeterminado (Fallback si no hay imagen)',
      type: 'string',
      options: {
        list: [
          { title: 'Shopify (Icono)', value: 'shopify' },
          { title: 'Tienda Nube (Icono)', value: 'tiendanube' },
          { title: 'Contentful (Icono)', value: 'contentful' },
          { title: 'Contento (Icono)', value: 'contento' },
          { title: 'Genérico / Inicial', value: 'generic' },
        ],
      },
    }),
    defineField({
      name: 'accentColor',
      title: 'Color o Borde de Acento (Opcional)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
    }),
    defineField({
      name: 'tagText',
      title: 'Etiqueta superior de la tarjeta (ej. "Partner")',
      type: 'string',
      description: 'Si se deja vacío, no se muestra ninguna etiqueta en la tarjeta.',
    }),
    defineField({
      name: 'conversionLabel',
      title: 'Texto del enlace inferior (ej. "Ver track de conversión")',
      type: 'string',
      description: 'Si se deja vacío, no se muestra este enlace en la tarjeta.',
    }),
    defineField({
      name: 'conversionLink',
      title: 'Enlace del texto inferior (opcional)',
      type: 'string',
      description: 'URL externa o ancla interna (ej. #contact-section). Si se deja vacío, el texto se muestra sin enlace.',
      hidden: ({parent}) => !parent?.conversionLabel,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'logoImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Partner',
        subtitle: subtitle || '',
        media: media,
      }
    },
  },
})
