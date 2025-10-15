import type { FastifyPluginAsync } from 'fastify'
import type { QuoteSubmitRequest } from '@insurance-quote/shared'

export const quotesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: QuoteSubmitRequest }>('/', async (request, reply) => {
    const { productType, data } = request.body

    if (!productType || !data) {
      return reply.status(400).send({
        error: 'Invalid request',
        message: 'productType and data are required',
      })
    }

    fastify.log.info({
      msg: 'Quote received',
      productType,
      data,
    })

    const quoteId = `quote-${Date.now()}`

    return {
      success: true,
      quoteId,
      message: 'Cotação recebida com sucesso',
    }
  })
}
