import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Shopping Bag', value: 'ShoppingBag' },
          { title: 'Layers', value: 'Layers' },
          { title: 'Palette', value: 'Palette' },
          { title: 'Search', value: 'Search' },
          { title: 'Code', value: 'Code2' },
          { title: 'CPU', value: 'Cpu' },
        ],
      },
    }),
    defineField({
      name: 'details',
      title: 'Details List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
