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
      description: 'Icono a mostrar en la tarjeta de servicio (Lucide Icons)',
      options: {
        list: [
          { title: 'Shopping Bag 🛍️ (eCommerce)', value: 'ShoppingBag' },
          { title: 'Layers 🥞 (Headless/Modular)', value: 'Layers' },
          { title: 'Palette 🎨 (UX/UI Design)', value: 'Palette' },
          { title: 'Search 🔍 (SEO/Analytics)', value: 'Search' },
          { title: 'Code 💻 (Desarrollo)', value: 'Code2' },
          { title: 'CPU ⚡ (Rendimiento)', value: 'Cpu' },
          { title: 'Zap ⚡ (Velocidad / ISR)', value: 'Zap' },
          { title: 'Rocket 🚀 (Escalabilidad)', value: 'Rocket' },
          { title: 'Shield 🛡️ (Ciberseguridad)', value: 'ShieldCheck' },
          { title: 'Database 🗄️ (Backend / Cloud)', value: 'Database' },
          { title: 'Smartphone 📱 (Apps Móviles)', value: 'Smartphone' },
          { title: 'Globe 🌐 (Internacionalización)', value: 'Globe' },
          { title: 'Workflow 🔄 (Automatización)', value: 'Workflow' },
          { title: 'BarChart 📈 (Growth / Métricas)', value: 'BarChart3' },
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
  preview: {
    select: {
      title: 'title',
      subtitle: 'icon',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Service',
        subtitle: subtitle ? `Icon: ${subtitle}` : 'No icon selected',
      }
    },
  },
})
