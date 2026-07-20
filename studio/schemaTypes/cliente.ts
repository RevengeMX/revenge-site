import { defineType, defineField } from 'sanity'

export const cliente = defineType({
  name: 'cliente',
  title: 'Client Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'metric',
      title: 'Impact Metric (e.g. +48%)',
      type: 'string',
    }),
    defineField({
      name: 'metricLabel',
      title: 'Metric Label (e.g. Conversión de Checkout)',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'quote',
      title: 'Quote/Testimonial',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: 'Testimonial Author',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Author Role',
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: 'Category Tag',
      type: 'string',
      options: {
        list: [
          { title: 'eCommerce', value: 'eCommerce' },
          { title: 'Headless', value: 'Headless' },
          { title: 'Mobile', value: 'Mobile' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
