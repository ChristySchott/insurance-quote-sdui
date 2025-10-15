import { createContext, useContext, useState, ReactNode } from 'react'
import type { StepDataMap, ProductSchema, Offer } from '@insurance-quote/shared'

interface CotacaoContextValue {
  productType: string | null
  schema: ProductSchema | null
  currentStep: number
  stepsData: StepDataMap
  selectedOffer: Offer | null
  setProductType: (productType: string) => void
  setSchema: (schema: ProductSchema) => void
  setCurrentStep: (step: number) => void
  updateStepData: (stepId: string, data: Record<string, unknown>) => void
  setSelectedOffer: (offer: Offer) => void
  resetCotacao: () => void
}

const CotacaoContext = createContext<CotacaoContextValue | null>(null)

export function CotacaoProvider({ children }: { children: ReactNode }) {
  const [productType, setProductType] = useState<string | null>(null)
  const [schema, setSchema] = useState<ProductSchema | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsData, setStepsData] = useState<StepDataMap>({})
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

  const updateStepData = (stepId: string, data: Record<string, unknown>) => {
    setStepsData((prev) => ({
      ...prev,
      [stepId]: data,
    }))
  }

  const resetCotacao = () => {
    setProductType(null)
    setSchema(null)
    setCurrentStep(0)
    setStepsData({})
    setSelectedOffer(null)
  }

  return (
    <CotacaoContext.Provider
      value={{
        productType,
        schema,
        currentStep,
        stepsData,
        selectedOffer,
        setProductType,
        setSchema,
        setCurrentStep,
        updateStepData,
        setSelectedOffer,
        resetCotacao,
      }}
    >
      {children}
    </CotacaoContext.Provider>
  )
}

export function useCotacao() {
  const context = useContext(CotacaoContext)

  if (!context) {
    throw new Error('useCotacao must be used within CotacaoProvider')
  }

  return context
}
