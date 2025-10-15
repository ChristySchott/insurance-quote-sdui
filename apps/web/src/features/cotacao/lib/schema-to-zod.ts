import { z } from 'zod'
import type { FieldDefinition } from '@insurance-quote/shared'

export function fieldToZodSchema(field: FieldDefinition): z.ZodType {
  let schema: z.ZodType

  switch (field.type) {
    case 'email':
      schema = z.string().email('E-mail inválido')
      break
    case 'phone':
    case 'text':
    default:
      schema = z.string()
      break
  }

  if (field.required) {
    schema = schema.pipe(z.string().min(1, 'Campo obrigatório'))
  }

  if (field.validation) {
    if (field.validation.pattern) {
      const regex = new RegExp(field.validation.pattern)
      schema = schema.pipe(
        z.string().regex(regex, field.validation.message || 'Formato inválido')
      )
    }

    if (field.validation.minLength) {
      schema = schema.pipe(
        z
          .string()
          .min(
            field.validation.minLength,
            field.validation.message ||
              `Mínimo de ${field.validation.minLength} caracteres`
          )
      )
    }

    if (field.validation.maxLength) {
      schema = schema.pipe(
        z
          .string()
          .max(
            field.validation.maxLength,
            field.validation.message ||
              `Máximo de ${field.validation.maxLength} caracteres`
          )
      )
    }
  }

  return schema
}

export function generateStepSchema(
  fields: FieldDefinition[]
): z.ZodObject<Record<string, z.ZodType>> {
  const schemaShape: Record<string, z.ZodType> = {}

  fields.forEach((field) => {
    schemaShape[field.id] = fieldToZodSchema(field)
  })

  return z.object(schemaShape)
}
