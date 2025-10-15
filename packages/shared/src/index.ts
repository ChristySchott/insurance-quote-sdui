export interface FieldOption {
  value: string
  label: string
}

export interface FieldValidation {
  pattern?: string
  message?: string
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
}

export interface LoadOptions {
  endpoint: string
  params?: string[]
}

export interface ShowIfCondition {
  field: string
  equals: string | boolean
}

export interface FieldDefinition {
  id: string
  type: 'text' | 'email' | 'phone' | 'select' | 'radio' | 'checkbox'
  label: string
  placeholder?: string
  mask?: string
  required?: boolean
  validation?: FieldValidation
  options?: FieldOption[]
  loadOptions?: LoadOptions
  dependsOn?: string
  showIf?: ShowIfCondition
  productSpecific?: boolean
}

export interface Coverage {
  name: string
  value: string
}

export interface Service {
  name: string
}

export interface PaymentOption {
  installments: number
  value: number
  label: string
}

export interface Offer {
  id: string
  name: string
  description?: string
  recommended?: boolean
  discount?: {
    percentage: number
    label: string
  }
  pricing: {
    fullPrice: number
    discountedPrice: number
    monthly: number
    installments: PaymentOption[]
  }
  coverages: Coverage[]
  services: Service[]
}

export interface StepDefinition {
  id: string
  title: string
  subtitle?: string
  type: 'form' | 'offers' | 'summary'
  fields?: FieldDefinition[]
  offersEndpoint?: string
}

export interface ProductConfig {
  productId: string
  productName: string
  commonFields: FieldDefinition[]
  specificFields: FieldDefinition[]
  offersEndpoint: string
}

export interface ProductSchema {
  productId: string
  productName: string
  steps: StepDefinition[]
}

export interface OffersResponse {
  offers: Offer[]
}

export interface FieldOptionsResponse {
  options: FieldOption[]
}

export interface QuoteSubmitRequest {
  productType: string
  data: Record<string, Record<string, unknown>>
  selectedOffer: Offer
}

export interface QuoteSubmitResponse {
  success: boolean
  quoteId: string
  message: string
}

export type StepDataMap = Record<string, Record<string, unknown>>
