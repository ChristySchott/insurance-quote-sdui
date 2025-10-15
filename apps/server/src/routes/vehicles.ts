import type { FastifyPluginAsync } from 'fastify'
import { getVehicleBrands, getVehicleModels } from '../services/mock-data.js'

export const vehiclesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/brands', async () => {
    return { options: getVehicleBrands() }
  })

  fastify.get<{ Querystring: { marca?: string } }>(
    '/models',
    async (request) => {
      const { marca } = request.query

      if (!marca) {
        return { options: [] }
      }

      return { options: getVehicleModels(marca) }
    }
  )
}
