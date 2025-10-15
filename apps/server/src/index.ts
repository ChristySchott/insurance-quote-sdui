import Fastify from 'fastify'
import cors from '@fastify/cors'
import { insuranceRoutes } from './routes/insurance.js'
import { vehiclesRoutes } from './routes/vehicles.js'
import { addressRoutes } from './routes/address.js'
import { quotesRoutes } from './routes/quotes.js'
import { offersRoutes } from './routes/offers.js'

const SIMULATED_DELAY_MS = 1500

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
})

await server.register(cors, {
  origin: true,
  credentials: true,
})

server.addHook('onRequest', async (_request, _reply) => {
  if (SIMULATED_DELAY_MS > 0) {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS))
  }
})

server.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

await server.register(insuranceRoutes, { prefix: '/api/insurance' })
await server.register(vehiclesRoutes, { prefix: '/api/vehicles' })
await server.register(addressRoutes, { prefix: '/api/address' })
await server.register(quotesRoutes, { prefix: '/api/quotes' })
await server.register(offersRoutes, { prefix: '/api/offers' })

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' })
    console.log('🚀 Server running on http://localhost:3001')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
