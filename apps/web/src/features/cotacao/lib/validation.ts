import type { FieldValidation } from '@insurance-quote/shared'

export function validateField(
  value: string,
  validation?: FieldValidation
): string | null {
  if (!validation) return null

  if (validation.pattern) {
    const regex = new RegExp(validation.pattern)
    if (!regex.test(value)) {
      return validation.message || 'Valor inválido'
    }
  }

  if (validation.minLength && value.length < validation.minLength) {
    return validation.message || `Mínimo de ${validation.minLength} caracteres`
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return validation.message || `Máximo de ${validation.maxLength} caracteres`
  }

  if (validation.min !== undefined && Number(value) < validation.min) {
    return validation.message || `Valor mínimo: ${validation.min}`
  }

  if (validation.max !== undefined && Number(value) > validation.max) {
    return validation.message || `Valor máximo: ${validation.max}`
  }

  return null
}
