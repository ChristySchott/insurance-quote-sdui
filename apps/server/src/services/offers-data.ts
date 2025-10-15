import type { Offer } from '@insurance-quote/shared'

export function getAutoOffers(formData: Record<string, unknown>): Offer[] {
  const hasRastreador = formData['possuiRastreador'] === 'sim'
  const baseDiscount = hasRastreador ? 25 : 15

  return [
    {
      id: 'auto-basico',
      name: 'Plano Básico',
      description: 'Proteção essencial para seu veículo',
      pricing: {
        fullPrice: 1200.0,
        discountedPrice: 1020.0,
        monthly: 85.0,
        installments: [
          { installments: 1, value: 1020.0, label: 'À vista' },
          { installments: 6, value: 170.0, label: '6x de R$ 170,00' },
          { installments: 12, value: 85.0, label: '12x de R$ 85,00' },
        ],
      },
      discount: {
        percentage: baseDiscount,
        label: `${baseDiscount}% de desconto`,
      },
      coverages: [
        { name: 'Incêndio', value: 'R$ 50.000,00' },
        { name: 'Roubo e Furto', value: 'R$ 50.000,00' },
        { name: 'Colisão', value: 'R$ 30.000,00' },
      ],
      services: [
        { name: 'Guincho 24h - 300km' },
        { name: 'Carro reserva - 7 dias' },
      ],
    },
    {
      id: 'auto-intermediario',
      name: 'Plano Intermediário',
      description: 'Proteção completa com mais benefícios',
      recommended: true,
      pricing: {
        fullPrice: 1800.0,
        discountedPrice: 1350.0,
        monthly: 112.5,
        installments: [
          { installments: 1, value: 1350.0, label: 'À vista' },
          { installments: 6, value: 225.0, label: '6x de R$ 225,00' },
          { installments: 12, value: 112.5, label: '12x de R$ 112,50' },
        ],
      },
      discount: {
        percentage: baseDiscount,
        label: `${baseDiscount}% de desconto`,
      },
      coverages: [
        { name: 'Incêndio', value: 'R$ 80.000,00' },
        { name: 'Roubo e Furto', value: 'R$ 80.000,00' },
        { name: 'Colisão', value: 'R$ 50.000,00' },
        { name: 'Danos Materiais a Terceiros', value: 'R$ 100.000,00' },
        { name: 'Danos Corporais a Terceiros', value: 'R$ 50.000,00' },
      ],
      services: [
        { name: 'Guincho 24h - 500km' },
        { name: 'Carro reserva - 15 dias' },
        { name: 'Chaveiro' },
        { name: 'Troca de pneu' },
      ],
    },
    {
      id: 'auto-premium',
      name: 'Plano Premium',
      description: 'Proteção máxima com todos os benefícios',
      pricing: {
        fullPrice: 2400.0,
        discountedPrice: 1800.0,
        monthly: 150.0,
        installments: [
          { installments: 1, value: 1800.0, label: 'À vista' },
          { installments: 6, value: 300.0, label: '6x de R$ 300,00' },
          { installments: 12, value: 150.0, label: '12x de R$ 150,00' },
        ],
      },
      discount: {
        percentage: baseDiscount,
        label: `${baseDiscount}% de desconto`,
      },
      coverages: [
        { name: 'Incêndio', value: 'R$ 150.000,00' },
        { name: 'Roubo e Furto', value: 'R$ 150.000,00' },
        { name: 'Colisão', value: 'Cobertura Total' },
        { name: 'Danos Materiais a Terceiros', value: 'R$ 200.000,00' },
        { name: 'Danos Corporais a Terceiros', value: 'R$ 100.000,00' },
        { name: 'Vidros', value: 'Cobertura Total' },
      ],
      services: [
        { name: 'Guincho 24h - Ilimitado' },
        { name: 'Carro reserva - 30 dias' },
        { name: 'Chaveiro' },
        { name: 'Troca de pneu' },
        { name: 'Assistência residencial' },
        { name: 'Carro blindado em caso de sinistro' },
      ],
    },
  ]
}

export function getResidencialOffers(
  formData: Record<string, unknown>
): Offer[] {
  const hasAlarme = formData['possuiAlarme'] === 'sim'
  const baseDiscount = hasAlarme ? 20 : 10

  return [
    {
      id: 'residencial-essencial',
      name: 'Plano Essencial',
      description: 'Proteção básica para seu imóvel',
      pricing: {
        fullPrice: 800.0,
        discountedPrice: 640.0,
        monthly: 53.33,
        installments: [
          { installments: 1, value: 640.0, label: 'À vista' },
          { installments: 6, value: 106.67, label: '6x de R$ 106,67' },
          { installments: 12, value: 53.33, label: '12x de R$ 53,33' },
        ],
      },
      discount: {
        percentage: baseDiscount,
        label: `${baseDiscount}% de desconto`,
      },
      coverages: [
        { name: 'Incêndio', value: 'R$ 100.000,00' },
        { name: 'Raio', value: 'R$ 100.000,00' },
        { name: 'Explosão', value: 'R$ 100.000,00' },
      ],
      services: [{ name: 'Encanador 24h' }, { name: 'Eletricista 24h' }],
    },
    {
      id: 'residencial-completo',
      name: 'Plano Completo',
      description: 'Proteção ampla para seu imóvel',
      recommended: true,
      pricing: {
        fullPrice: 1200.0,
        discountedPrice: 960.0,
        monthly: 80.0,
        installments: [
          { installments: 1, value: 960.0, label: 'À vista' },
          { installments: 6, value: 160.0, label: '6x de R$ 160,00' },
          { installments: 12, value: 80.0, label: '12x de R$ 80,00' },
        ],
      },
      discount: {
        percentage: baseDiscount,
        label: `${baseDiscount}% de desconto`,
      },
      coverages: [
        { name: 'Incêndio', value: 'R$ 200.000,00' },
        { name: 'Raio', value: 'R$ 200.000,00' },
        { name: 'Explosão', value: 'R$ 200.000,00' },
        { name: 'Roubo e Furto', value: 'R$ 50.000,00' },
        { name: 'Danos Elétricos', value: 'R$ 15.000,00' },
      ],
      services: [
        { name: 'Encanador 24h' },
        { name: 'Eletricista 24h' },
        { name: 'Chaveiro' },
        { name: 'Vidraceiro' },
        { name: 'Limpeza pós-sinistro' },
      ],
    },
    {
      id: 'residencial-total',
      name: 'Plano Total',
      description: 'Proteção máxima com todos os benefícios',
      pricing: {
        fullPrice: 1600.0,
        discountedPrice: 1280.0,
        monthly: 106.67,
        installments: [
          { installments: 1, value: 1280.0, label: 'À vista' },
          { installments: 6, value: 213.33, label: '6x de R$ 213,33' },
          { installments: 12, value: 106.67, label: '12x de R$ 106,67' },
        ],
      },
      discount: {
        percentage: baseDiscount,
        label: `${baseDiscount}% de desconto`,
      },
      coverages: [
        { name: 'Incêndio', value: 'R$ 300.000,00' },
        { name: 'Raio', value: 'R$ 300.000,00' },
        { name: 'Explosão', value: 'R$ 300.000,00' },
        { name: 'Roubo e Furto', value: 'R$ 100.000,00' },
        { name: 'Danos Elétricos', value: 'R$ 30.000,00' },
        { name: 'Vendaval', value: 'R$ 50.000,00' },
        { name: 'Responsabilidade Civil', value: 'R$ 50.000,00' },
      ],
      services: [
        { name: 'Encanador 24h' },
        { name: 'Eletricista 24h' },
        { name: 'Chaveiro' },
        { name: 'Vidraceiro' },
        { name: 'Limpeza pós-sinistro' },
        { name: 'Hospedagem alternativa' },
        { name: 'Guarda de móveis' },
      ],
    },
  ]
}
