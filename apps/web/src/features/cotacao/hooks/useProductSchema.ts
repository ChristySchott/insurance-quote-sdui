import { useQuery } from '@tanstack/react-query'
import { fetchProductSchema } from '@/shared/lib/api'
import type { ProductSchema } from '@insurance-quote/shared'

export function useProductSchema(productType: string | null) {
  return useQuery<ProductSchema>({
    queryKey: ['product-schema', productType],
    queryFn: () => fetchProductSchema(productType!),
    enabled: !!productType,
    staleTime: Infinity,
  })
}
