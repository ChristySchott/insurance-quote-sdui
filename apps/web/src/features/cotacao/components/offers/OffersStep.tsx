import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import type { Offer } from '@insurance-quote/shared'
import { useCotacao } from '../../hooks/useCotacao'
import { fetchOffers } from '@/shared/lib/api'
import { Button } from '@/shared/components/Button'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'
import { OfferCard } from './OffersCard'

interface OffersStepProps {
  offersEndpoint: string
  onNext: () => void
  onPrevious: () => void
}

export function OffersStep({
  offersEndpoint,
  onNext,
  onPrevious,
}: OffersStepProps) {
  const { stepsData, setSelectedOffer, selectedOffer } = useCotacao()
  const [localSelectedOffer, setLocalSelectedOffer] = useState<string | null>(
    selectedOffer?.id || null
  )

  const { data, isPending, error, mutate } = useMutation({
    mutationKey: ['offers', offersEndpoint],
    mutationFn: () => fetchOffers(offersEndpoint, stepsData),
  })

  useEffect(() => {
    mutate()
  }, [])

  const handleSelectOffer = (offer: Offer) => {
    setLocalSelectedOffer(offer.id)
    setSelectedOffer(offer)
  }

  const handleNext = () => {
    if (localSelectedOffer && data?.offers) {
      const offer = data.offers.find((o: Offer) => o.id === localSelectedOffer)
      if (offer) {
        setSelectedOffer(offer)
        onNext()
      }
    }
  }

  if (isPending) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <LoadingSpinner />
        <p className="text-center text-gray-600 mt-4">
          Buscando as melhores ofertas para você...
        </p>
      </div>
    )
  }

  if (Boolean(error)) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-red-600 mb-4">
          Erro ao carregar ofertas:{' '}
          {error instanceof Error ? error.message : 'Erro desconhecido'}
        </p>
        <Button onClick={() => mutate()}>Tentar Novamente</Button>
      </div>
    )
  }

  const offers = data?.offers || []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {offers.map((offer: Offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            selected={localSelectedOffer === offer.id}
            onSelect={() => handleSelectOffer(offer)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onPrevious}>
          Voltar
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!localSelectedOffer}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
