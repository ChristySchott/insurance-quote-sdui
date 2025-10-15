import { forwardRef } from 'react'

interface EmailFieldProps {
  id: string
  label: string
  placeholder?: string
  error?: string
}

export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  ({ id, label, placeholder, error, ...props }, ref) => {
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
          type="email"
          id={id}
          placeholder={placeholder}
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

EmailField.displayName = 'EmailField'
