import { forwardRef } from 'react'
import type { FieldOption } from '@insurance-quote/shared'

interface RadioFieldProps {
  id: string
  label: string
  options: FieldOption[]
  error?: string
  value?: string
  onChange?: (value: string) => void
}

export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
  ({ id, label, options, error, value, onChange }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                ref={ref}
                type="radio"
                name={id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

RadioField.displayName = 'RadioField'
