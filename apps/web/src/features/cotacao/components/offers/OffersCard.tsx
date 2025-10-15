import { Card } from '@/shared/components/Card'
import { Offer } from '@insurance-quote/shared'

interface OfferCardProps {
  offer: Offer
  selected: boolean
  onSelect: () => void
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function OfferCard({ offer, selected, onSelect }: OfferCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all ${
        selected ? 'ring-2 ring-primary-600 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{offer.name}</h3>
          {offer.description && (
            <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
          )}
        </div>
        <input
          type="radio"
          checked={selected}
          onChange={onSelect}
          className="w-5 h-5 text-primary-600 focus:ring-primary-500"
        />
      </div>

      {offer.discount && (
        <div className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-2 rounded-lg mb-4">
          {offer.discount.label}
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          {offer.pricing.fullPrice !== offer.pricing.discountedPrice && (
            <span className="text-gray-400 line-through text-sm">
              {formatCurrency(offer.pricing.fullPrice)}
            </span>
          )}
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {formatCurrency(offer.pricing.discountedPrice)}
        </div>
        <div className="text-sm text-gray-600">
          ou {offer.pricing.installments.length} parcelas de{' '}
          {formatCurrency(offer.pricing.monthly)}
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Coberturas</h4>
        <ul className="space-y-2">
          {offer.coverages.map((coverage, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 flex justify-between"
            >
              <span>{coverage.name}</span>
              <span className="font-medium">{coverage.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {offer.services.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-2">Serviços</h4>
          <ul className="space-y-1">
            {offer.services.map((service, index) => (
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
      )}
    </Card>
  )
}
