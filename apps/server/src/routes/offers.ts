import type { FastifyPluginAsync } from 'fastify'
import { getAutoOffers, getResidencialOffers } from '../services/offers-data.js'

export const offersRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{
    Params: { productType: string }
    Body: Record<string, unknown>
  }>('/:productType', async (request, reply) => {
    const { productType } = request.params
    const formData = request.body

    fastify.log.info({ productType, formData }, 'Generating offers')

    let offers

    switch (productType) {
      case 'auto':
        offers = getAutoOffers(formData)
        break
      case 'residencial':
        offers = getResidencialOffers(formData)
        break
      default:
        return reply.status(400).send({
          error: 'Invalid product type',
          message: 'Product type must be "auto" or "residencial"',
        })
    }

    return { offers }
  })
}
