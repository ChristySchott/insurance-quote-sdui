const API_BASE_URL = '/api'

export async function fetchProductSchema(productType: string) {
  const response = await fetch(
    `${API_BASE_URL}/insurance/${productType}/schema`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch schema: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchFieldOptions(
  endpoint: string,
  params?: Record<string, string>
) {
  const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Failed to fetch options: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchOffers(
  endpoint: string,
  formData: Record<string, Record<string, unknown>>
) {
  const allData = Object.values(formData).reduce((acc, stepData) => {
    return { ...acc, ...stepData }
  }, {})

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(allData),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch offers: ${response.statusText}`)
  }

  return response.json()
}

export async function submitQuote(data: unknown) {
  const response = await fetch(`${API_BASE_URL}/quotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to submit quote: ${response.statusText}`)
  }

  return response.json()
}
