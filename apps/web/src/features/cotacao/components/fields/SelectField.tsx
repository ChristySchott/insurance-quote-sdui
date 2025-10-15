import { forwardRef } from 'react'
import type { FieldOption } from '@insurance-quote/shared'

interface SelectFieldProps {
  id: string
  label: string
  placeholder?: string
  options: FieldOption[]
  error?: string
  loading?: boolean
  disabled?: boolean
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { id, label, placeholder, options, error, loading, disabled, ...props },
    ref
  ) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          disabled={disabled || loading}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        >
          <option value="">
            {loading ? 'Carregando...' : placeholder || 'Selecione'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

SelectField.displayName = 'SelectField'
