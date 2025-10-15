import { useNavigate } from '@tanstack/react-router'
import { useCotacao } from '../hooks/useCotacao'
import { Card } from '@/shared/components/Card'

const PRODUCTS = [
  {
    id: 'auto',
    name: 'Seguro Auto',
    description: 'Proteja seu veículo com as melhores coberturas',
    icon: '🚗',
  },
  {
    id: 'residencial',
    name: 'Seguro Residencial',
    description: 'Segurança completa para seu imóvel',
    icon: '🏠',
  },
]

export function ProductSelector() {
  const navigate = useNavigate()
  const { setProductType, setCurrentStep, resetCotacao } = useCotacao()

  const handleProductSelect = (productId: string) => {
    resetCotacao()
    setProductType(productId)
    setCurrentStep(0)
    navigate({ to: '/cotacao' })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Escolha o tipo de seguro
        </h1>
        <p className="text-lg text-gray-600">
          Selecione o produto que deseja cotar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRODUCTS.map((product) => (
          <Card
            key={product.id}
            className="p-8 hover:scale-105 transition-transform"
            onClick={() => handleProductSelect(product.id)}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{product.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
