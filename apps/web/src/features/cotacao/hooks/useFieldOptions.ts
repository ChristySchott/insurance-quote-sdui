import { useQuery } from '@tanstack/react-query'
import { fetchFieldOptions } from '@/shared/lib/api'
import type { FieldOptionsResponse } from '@insurance-quote/shared'

export function useFieldOptions(
  endpoint: string,
  params?: Record<string, string>,
  enabled: boolean = true
) {
  return useQuery<FieldOptionsResponse>({
    queryKey: ['field-options', endpoint, params],
    queryFn: () => fetchFieldOptions(endpoint, params),
    enabled,
    staleTime: 1000 * 60 * 5,
  })
}
