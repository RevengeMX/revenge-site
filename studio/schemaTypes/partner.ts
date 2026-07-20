import { defineType, defineField } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'logoType',
      title: 'Logo Type',
      type: 'string',
      options: {
        list: [
          { title: 'Contento', value: 'contento' },
          { title: 'Shopify', value: 'shopify' },
          { title: 'Tienda Nube', value: 'tiendanube' },
          { title: 'Contentful', value: 'contentful' },
        ],
      },
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Class/Styles description',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
