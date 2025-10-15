import { createFileRoute } from '@tanstack/react-router'
import { ProductSelectionPage } from '../features/cotacao/pages/ProductSelectionPage'

export const Route = createFileRoute('/')({
  component: ProductSelectionPage,
})
