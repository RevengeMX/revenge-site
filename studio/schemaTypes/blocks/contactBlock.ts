import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Form Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'Hablemos de tu Proyecto',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Transformemos tu Presencia Digital',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue: 'Completa la información y nos pondremos en contacto contigo en menos de 24 horas hábiles para programar una llamada de diagnóstico técnico sin costo.',
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Card Label',
      type: 'string',
      initialValue: 'Email Corporativo',
    }),
    defineField({
      name: 'emailValue',
      title: 'Email Address',
      type: 'string',
      initialValue: 'hola@revenge.agency',
    }),
    defineField({
      name: 'phoneLabel',
      title: 'Phone Card Label',
      type: 'string',
      initialValue: 'Atención Directa / WhatsApp',
    }),
    defineField({
      name: 'phoneValue',
      title: 'Phone / WhatsApp Number',
      type: 'string',
      initialValue: '+52 55 1234 5678',
    }),
    defineField({
      name: 'phoneLink',
      title: 'WhatsApp Link',
      type: 'string',
      initialValue: 'https://wa.me/525512345678',
    }),
    defineField({
      name: 'securityTitle',
      title: 'Security Box Title',
      type: 'string',
      initialValue: 'Integración Segura con Zoho CRM',
    }),
    defineField({
      name: 'securityDescription',
      title: 'Security Box Description',
      type: 'string',
      initialValue: 'Tus datos viajan cifrados directamente a nuestro sistema Zoho CRM bajo estrictas políticas de confidencialidad.',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Contactar',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Sección de Contacto (Zoho CRM)',
        subtitle: 'Formulario de Leads — Zoho CRM',
        media: EnvelopeIcon,
      }
    },
  },
})
