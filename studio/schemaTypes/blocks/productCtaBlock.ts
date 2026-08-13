import {defineType, defineField} from 'sanity'
import {SparklesIcon} from '@sanity/icons/Sparkles'

export const productCtaBlock = defineType({
  name: 'productCtaBlock',
  title: 'Product: CTA Final / Contacto',
  type: 'object',
  icon: SparklesIcon,
  description: 'Presentación visual propia para landings de producto. Envía al mismo backend de leads (Zoho CRM) que el resto del sitio — no reconstruye la integración, solo cambia el diseño.',
  fields: [
    defineField({name: 'badgeText', title: 'Badge (ej. "Empieza hoy")', type: 'string'}),
    defineField({name: 'title', title: 'Título', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtítulo', type: 'text'}),
    defineField({name: 'submitButtonText', title: 'Texto del botón enviar', type: 'string', initialValue: 'Solicitar demo'}),
    defineField({name: 'emailValue', title: 'Email de contacto directo (opcional)', type: 'string'}),
    defineField({name: 'phoneValue', title: 'Teléfono / WhatsApp directo (opcional)', type: 'string'}),
    defineField({name: 'phoneLink', title: 'Link de WhatsApp (opcional)', type: 'string'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Untitled Product CTA', subtitle: 'Product Landing · CTA Final', media: SparklesIcon}
    },
  },
})
