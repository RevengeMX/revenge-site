import { defineType, defineField } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Page Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      initialValue: 'Revenge - Home',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder Sections',
      type: 'array',
      group: 'content',
      of: [
        { type: 'heroBlock' },
        { type: 'partnersBlock' },
        { type: 'servicesBlock' },
        { type: 'clientesBlock' },
        { type: 'contactBlock' },
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      group: 'seo',
      description: 'Title tag for SEO. Usually 50-60 characters.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      group: 'seo',
      description: 'Description tag for search engines. Usually 150-160 characters.',
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image (OG Image)',
      type: 'image',
      group: 'seo',
      description: 'Image used for social media previews (Open Graph). Optimal size is 1200x630.',
    }),
  ],
})
