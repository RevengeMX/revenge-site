import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

export const productScreenshotShowcaseBlock = defineType({
  name: 'productScreenshotShowcaseBlock',
  title: 'Product: Capturas / Demo Visual',
  type: 'object',
  icon: ImagesIcon,
  description: 'Galería de capturas reales (app y/o panel web). Todas las imágenes pueden quedar vacías como placeholder hasta tener los assets finales.',
  fields: [
    defineField({name: 'title', title: 'Título de sección', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text'}),
    defineField({
      name: 'screenshots',
      title: 'Capturas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'screenshot',
          fields: [
            {
              name: 'group',
              title: 'Grupo',
              type: 'string',
              options: {
                list: [
                  {title: 'App móvil', value: 'app'},
                  {title: 'Panel web', value: 'panel'},
                ],
              },
            },
            {
              name: 'image',
              title: 'Imagen (PLACEHOLDER pendiente)',
              type: 'image',
              options: {hotspot: true},
            },
            {name: 'caption', title: 'Descripción breve (ej. "Marcaje con Face ID")', type: 'string'},
          ],
          preview: {
            select: {title: 'caption', subtitle: 'group', media: 'image'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', screenshots: 'screenshots'},
    prepare({title, screenshots}) {
      return {
        title: title || 'Untitled Screenshot Showcase',
        subtitle: `Product Landing · ${(screenshots || []).length} captura(s)`,
        media: ImagesIcon,
      }
    },
  },
})
