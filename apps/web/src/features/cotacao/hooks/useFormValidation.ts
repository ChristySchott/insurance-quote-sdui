import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateStepSchema } from '../lib/schema-to-zod'
import type { FieldDefinition } from '@insurance-quote/shared'

export function useFormValidation(
  fields: FieldDefinition[],
  defaultValues?: Record<string, unknown>
) {
  const schema = useMemo(() => generateStepSchema(fields), [fields])

  return useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  })
}
