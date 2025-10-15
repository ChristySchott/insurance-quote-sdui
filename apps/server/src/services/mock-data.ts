import type { FieldOption } from '@insurance-quote/shared'

export function getVehicleBrands(): FieldOption[] {
  return [
    { value: 'fiat', label: 'Fiat' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'chevrolet', label: 'Chevrolet' },
    { value: 'ford', label: 'Ford' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'honda', label: 'Honda' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'renault', label: 'Renault' },
  ]
}

export function getVehicleModels(brand: string): FieldOption[] {
  const models: Record<string, FieldOption[]> = {
    fiat: [
      { value: 'uno', label: 'Uno' },
      { value: 'argo', label: 'Argo' },
      { value: 'mobi', label: 'Mobi' },
      { value: 'toro', label: 'Toro' },
      { value: 'strada', label: 'Strada' },
    ],
    volkswagen: [
      { value: 'gol', label: 'Gol' },
      { value: 'polo', label: 'Polo' },
      { value: 'virtus', label: 'Virtus' },
      { value: 'tcross', label: 'T-Cross' },
      { value: 'tiguan', label: 'Tiguan' },
    ],
    chevrolet: [
      { value: 'onix', label: 'Onix' },
      { value: 'prisma', label: 'Prisma' },
      { value: 'tracker', label: 'Tracker' },
      { value: 'spin', label: 'Spin' },
      { value: 's10', label: 'S10' },
    ],
    ford: [
      { value: 'ka', label: 'Ka' },
      { value: 'ecosport', label: 'EcoSport' },
      { value: 'ranger', label: 'Ranger' },
      { value: 'territory', label: 'Territory' },
    ],
    toyota: [
      { value: 'corolla', label: 'Corolla' },
      { value: 'hilux', label: 'Hilux' },
      { value: 'yaris', label: 'Yaris' },
      { value: 'rav4', label: 'RAV4' },
    ],
    honda: [
      { value: 'civic', label: 'Civic' },
      { value: 'city', label: 'City' },
      { value: 'hrv', label: 'HR-V' },
      { value: 'crv', label: 'CR-V' },
    ],
    hyundai: [
      { value: 'hb20', label: 'HB20' },
      { value: 'creta', label: 'Creta' },
      { value: 'tucson', label: 'Tucson' },
      { value: 'ix35', label: 'ix35' },
    ],
    renault: [
      { value: 'kwid', label: 'Kwid' },
      { value: 'sandero', label: 'Sandero' },
      { value: 'duster', label: 'Duster' },
      { value: 'captur', label: 'Captur' },
    ],
  }

  return models[brand] || []
}

export function getPropertyTypes(): FieldOption[] {
  return [
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'kitnet', label: 'Kitnet' },
    { value: 'cobertura', label: 'Cobertura' },
  ]
}

export function getCepData(cep: string) {
  const mockAddresses: Record<string, unknown> = {
    '01310100': {
      cep: '01310-100',
      logradouro: 'Av. Paulista',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    '20040020': {
      cep: '20040-020',
      logradouro: 'Av. Rio Branco',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
    },
    '30130100': {
      cep: '30130-100',
      logradouro: 'Av. Afonso Pena',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      estado: 'MG',
    },
  }

  return (
    mockAddresses[cep] || {
      cep: cep.replace(/^(\d{5})(\d{3})$/, '$1-$2'),
      logradouro: 'Rua Exemplo',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
    }
  )
}
