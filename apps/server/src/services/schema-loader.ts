import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { ProductConfig } from '@insurance-quote/shared'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const configCache = new Map<string, ProductConfig>()

export function loadProductConfig(productType: string): ProductConfig | null {
  if (configCache.has(productType)) {
    return configCache.get(productType)!
  }

  try {
    const schemaPath = join(__dirname, '../schemas', `${productType}.json`)
    const schemaContent = readFileSync(schemaPath, 'utf-8')
    const config = JSON.parse(schemaContent) as ProductConfig

    configCache.set(productType, config)

    return config
  } catch (error) {
    console.error(`Error loading config for ${productType}:`, error)
    return null
  }
}
