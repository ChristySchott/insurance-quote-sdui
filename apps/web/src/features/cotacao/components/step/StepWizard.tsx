import { ReactNode, useEffect } from 'react'
import { useCotacao } from '../../hooks/useCotacao'
import { useProductSchema } from '../../hooks/useProductSchema'
import { StepProgress } from './StepProgress'
import { DynamicForm } from '../DynamicForm'
import { OffersStep } from '../offers/OffersStep'
import { SummaryStep } from '../SummaryStep'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { StepDefinition } from '@insurance-quote/shared'

export function StepWizard() {
  const {
    productType,
    schema,
    currentStep,
    stepsData,
    setSchema,
    setCurrentStep,
    updateStepData,
  } = useCotacao()

  const {
    data: fetchedSchema,
    isLoading,
    error,
  } = useProductSchema(productType)

  useEffect(() => {
    if (fetchedSchema && !schema) {
      setSchema(fetchedSchema)
    }
  }, [fetchedSchema, schema, setSchema])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar schema do produto</p>
      </div>
    )
  }

  if (!schema) {
    return null
  }

  const currentStepData = schema.steps[currentStep]
  const stepTitles = schema.steps.map((s) => s.title)

  const handleStepSubmit = (data: Record<string, unknown>) => {
    updateStepData(currentStepData.id, data)

    if (currentStep < schema.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleNext = () => {
    if (currentStep < schema.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    const defaultComponent = (
      <DynamicForm
        step={currentStepData}
        defaultValues={stepsData[currentStepData.id]}
        onSubmit={handleStepSubmit}
        onPrevious={handlePrevious}
        isFirstStep={currentStep === 0}
        isLastStep={false}
      />
    )

    const componentBasedOnStepType: Record<StepDefinition['type'], ReactNode> =
      {
        offers: (
          <OffersStep
            offersEndpoint={currentStepData.offersEndpoint!}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        ),
        summary: <SummaryStep />,
        form: defaultComponent,
      }

    return componentBasedOnStepType[currentStepData.type] || defaultComponent
  }

  return (
    <div>
      <StepProgress
        totalSteps={schema.steps.length}
        currentStep={currentStep}
        stepTitles={stepTitles}
      />

      {renderStepContent()}
    </div>
  )
}
