import { createFileRoute } from '@tanstack/react-router'
import { QuotePage } from '../features/cotacao/pages/QuotePage'

export const Route = createFileRoute('/cotacao')({
  component: QuotePage,
})
