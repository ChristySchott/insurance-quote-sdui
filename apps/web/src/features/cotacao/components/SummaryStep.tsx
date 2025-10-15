import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useCotacao } from '../hooks/useCotacao'
import { submitQuote } from '@/shared/lib/api'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function SummaryStep() {
  const {
    productType,
    schema,
    stepsData,
    selectedOffer,
    setCurrentStep,
    resetCotacao,
  } = useCotacao()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitMutation = useMutation({
    mutationFn: submitQuote,
    onSuccess: () => {
      alert('Cotação enviada com sucesso!')
      resetCotacao()
      navigate({ to: '/' })
    },
    onError: () => {
      alert('Erro ao enviar cotação. Tente novamente.')
    },
  })

  const handleSubmit = async () => {
    if (!selectedOffer) {
      alert('Selecione uma oferta antes de enviar')
      return
    }

    setIsSubmitting(true)

    await submitMutation.mutateAsync({
      productType,
      data: stepsData,
      selectedOffer,
    })

    setIsSubmitting(false)
  }

  const handlePrevious = () => {
    const lastFormStepIndex = (schema?.steps.length || 1) - 2
    setCurrentStep(lastFormStepIndex)
  }

  const getFieldLabel = (stepId: string, fieldId: string): string => {
    const step = schema?.steps.find((s) => s.id === stepId)
    const field = step?.fields?.find((f) => f.id === fieldId)
    return field?.label || fieldId
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Resumo da Cotação
        </h2>
        <p className="text-gray-600 mb-6">
          Revise os dados informados e a oferta selecionada antes de enviar sua
          cotação
        </p>

        <div className="space-y-6">
          {Object.entries(stepsData).map(([stepId, data]) => {
            const step = schema?.steps.find((s) => s.id === stepId)

            if (!step || step.type !== 'form') return null

            return (
              <div key={stepId} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  {step.title}
                </h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(data).map(([fieldId, value]) => (
                    <div key={fieldId}>
                      <dt className="text-sm font-medium text-gray-500">
                        {getFieldLabel(stepId, fieldId)}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {Array.isArray(value)
                          ? value.join(', ')
                          : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )
          })}
        </div>
      </Card>

      {selectedOffer && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Oferta Selecionada
          </h2>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedOffer.name}
                </h3>
                {selectedOffer.description && (
                  <p className="text-gray-600 mt-1">
                    {selectedOffer.description}
                  </p>
                )}
              </div>
              {selectedOffer.discount && (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {selectedOffer.discount.label}
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="text-3xl font-bold text-primary-600">
                {formatCurrency(selectedOffer.pricing.discountedPrice)}
              </div>
              <div className="text-sm text-gray-600">
                ou {selectedOffer.pricing.installments.length} parcelas de{' '}
                {formatCurrency(selectedOffer.pricing.monthly)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Coberturas</h4>
              <ul className="space-y-2">
                {selectedOffer.coverages.map((coverage, index) => (
                  <li key={index} className="text-sm flex justify-between">
                    <span className="text-gray-700">{coverage.name}</span>
                    <span className="font-medium text-gray-900">
                      {coverage.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Serviços Inclusos
              </h4>
              <ul className="space-y-2">
                {selectedOffer.services.map((service, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 flex items-start"
                  >
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{service.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={handlePrevious}>
          Voltar
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedOffer}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Cotação'}
        </Button>
      </div>
    </div>
  )
}
