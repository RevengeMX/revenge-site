import {defineType, defineField} from 'sanity'
import {ComponentIcon} from '@sanity/icons/Component'

export const productClientsBlock = defineType({
  name: 'productClientsBlock',
  title: 'Product: Confían en Nosotros (Logos)',
  type: 'object',
  icon: ComponentIcon,
  description: 'Carrusel de logos, con presentación propia para landings de producto. Reutiliza el mismo tipo de contenido "Current Client" que el sitio principal (mismos logos si aplica), pero con su propio componente visual. Opcional — puede quedar sin clientes mientras no haya prueba social.',
  fields: [
    defineField({name: 'title', title: 'Título de sección', type: 'string'}),
    defineField({
      name: 'clients',
      title: 'Clientes (logos)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'currentClient'}]}],
    }),
  ],
  preview: {
    select: {title: 'title', clients: 'clients'},
    prepare({title, clients}) {
      return {
        title: title || 'Untitled Product Clients',
        subtitle: `Product Landing · ${(clients || []).length} cliente(s)`,
        media: ComponentIcon,
      }
    },
  },
})
