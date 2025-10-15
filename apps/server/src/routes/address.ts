import type { FastifyPluginAsync } from 'fastify'
import { getCepData } from '../services/mock-data.js'

export const addressRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { cep: string } }>(
    '/cep/:cep',
    async (request, reply) => {
      const { cep } = request.params

      const cepNumbers = cep.replace(/\D/g, '')

      if (cepNumbers.length !== 8) {
        return reply.status(400).send({
          error: 'Invalid CEP',
          message: 'CEP must have 8 digits',
        })
      }

      return getCepData(cepNumbers)
    }
  )
}
