import type { FastifyPluginAsync } from 'fastify'
import { loadProductConfig } from '../services/schema-loader.js'
import type { ProductSchema } from '@insurance-quote/shared'

export const insuranceRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { productType: string } }>(
    '/:productType/schema',
    async (request, reply) => {
      const { productType } = request.params

      if (!['auto', 'residencial'].includes(productType)) {
        return reply.status(400).send({
          error: 'Invalid product type',
          message: 'Product type must be "auto" or "residencial"',
        })
      }

      const config = loadProductConfig(productType)

      if (!config) {
        return reply.status(404).send({
          error: 'Schema not found',
          message: `Schema for product type "${productType}" not found`,
        })
      }

      const schema: ProductSchema = {
        productId: config.productId,
        productName: config.productName,
        steps: [
          {
            id: 'step-1',
            title: 'Dados Iniciais',
            subtitle: 'Informe o CPF do segurado',
            type: 'form',
            fields: [
              {
                id: 'cpf',
                type: 'text',
                label: 'CPF',
                placeholder: '000.000.000-00',
                mask: '999.999.999-99',
                required: true,
                validation: {
                  pattern: '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$',
                  message: 'CPF inválido',
                },
              },
            ],
          },
          {
            id: 'step-2',
            title: 'Dados Complementares',
            subtitle: 'Informações pessoais e específicas',
            type: 'form',
            fields: [...config.commonFields, ...config.specificFields],
          },
          {
            id: 'step-3',
            title: 'Ofertas',
            subtitle: 'Escolha a melhor oferta para você',
            type: 'offers',
            offersEndpoint: config.offersEndpoint,
          },
          {
            id: 'step-4',
            title: 'Resumo',
            subtitle: 'Confira os dados e a oferta selecionada',
            type: 'summary',
          },
        ],
      }

      return schema
    }
  )
}
