import { useWatch } from 'react-hook-form'
import type { FieldDefinition } from '@insurance-quote/shared'
import { TextField } from './fields/TextField'
import { EmailField } from './fields/EmailField'
import { SelectField } from './fields/SelectField'
import { RadioField } from './fields/RadioField'
import { CheckboxField } from './fields/CheckboxField'
import { useFieldOptions } from '../hooks/useFieldOptions'

interface FieldRendererProps {
  field: FieldDefinition
  register: any
  control: any
  errors: any
  setValue: any
}

export function FieldRenderer({
  field,
  register,
  control,
  errors,
  setValue,
}: FieldRendererProps) {
  const watchedValues = useWatch({ control })

  const shouldShow = () => {
    if (!field.showIf) return true

    const dependentValue = watchedValues[field.showIf.field]
    return dependentValue === field.showIf.equals
  }

  const dependentFieldValue = field.dependsOn
    ? watchedValues[field.dependsOn]
    : undefined

  const { data: optionsData, isLoading: optionsLoading } = useFieldOptions(
    field.loadOptions?.endpoint || '',
    field.loadOptions?.params?.reduce(
      (acc, param) => {
        acc[param] = watchedValues[param]
        return acc
      },
      {} as Record<string, string>
    ),
    !!(field.loadOptions && (!field.dependsOn || dependentFieldValue))
  )

  if (!shouldShow()) {
    return null
  }

  const error = errors[field.id]?.message
  const fieldOptions = field.options || optionsData?.options || []

  const commonProps = {
    id: field.id,
    label: field.label,
    placeholder: field.placeholder,
    error,
    ...register(field.id),
  }

  switch (field.type) {
    case 'text':
      return (
        <TextField
          {...commonProps}
          mask={field.mask}
          onChange={(value) =>
            setValue(field.id, value, { shouldValidate: true })
          }
        />
      )

    case 'email':
      return <EmailField {...commonProps} />

    case 'select':
      return (
        <SelectField
          {...commonProps}
          options={fieldOptions}
          loading={optionsLoading}
          disabled={field.dependsOn ? !dependentFieldValue : false}
        />
      )

    case 'radio':
      return (
        <RadioField
          {...commonProps}
          options={fieldOptions}
          value={watchedValues[field.id]}
          onChange={(value) =>
            setValue(field.id, value, { shouldValidate: true })
          }
        />
      )

    case 'checkbox':
      return (
        <CheckboxField
          {...commonProps}
          options={fieldOptions}
          value={watchedValues[field.id] || []}
          onChange={(value) =>
            setValue(field.id, value, { shouldValidate: true })
          }
        />
      )

    default:
      return null
  }
}
