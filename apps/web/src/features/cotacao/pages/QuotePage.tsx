import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useCotacao } from '../hooks/useCotacao'
import { StepWizard } from '../components/step/StepWizard'

export function QuotePage() {
  const navigate = useNavigate()
  const { productType } = useCotacao()

  useEffect(() => {
    if (!productType) {
      navigate({ to: '/' })
    }
  }, [productType, navigate])

  if (!productType) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      <StepWizard />
    </div>
  )
}
