import { forwardRef } from 'react'
import { applyMask } from '../../lib/masks'

interface TextFieldProps {
  id: string
  label: string
  placeholder?: string
  mask?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, placeholder, mask, error, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const maskedValue = mask ? applyMask(rawValue, mask) : rawValue
      onChange?.(maskedValue)
    }

    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          id={id}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

TextField.displayName = 'TextField'
