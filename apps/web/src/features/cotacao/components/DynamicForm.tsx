import { useEffect } from 'react'
import type { StepDefinition } from '@insurance-quote/shared'
import { useFormValidation } from '../hooks/useFormValidation'
import { FieldRenderer } from './FieldRenderer'
import { Button } from '@/shared/components/Button'

interface DynamicFormProps {
  step: StepDefinition
  defaultValues?: Record<string, unknown>
  onSubmit: (data: Record<string, unknown>) => void
  onPrevious?: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function DynamicForm({
  step,
  defaultValues,
  onSubmit,
  onPrevious,
  isFirstStep,
  isLastStep,
}: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useFormValidation(step.fields || [], defaultValues)

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
        {step.subtitle && <p className="text-gray-600 mb-6">{step.subtitle}</p>}

        <div className="space-y-4">
          {step.fields?.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        {!isFirstStep && (
          <Button type="button" variant="secondary" onClick={onPrevious}>
            Voltar
          </Button>
        )}
        <Button type="submit" className={isFirstStep ? 'ml-auto' : ''}>
          {isLastStep ? 'Finalizar' : 'Próximo'}
        </Button>
      </div>
    </form>
  )
}
