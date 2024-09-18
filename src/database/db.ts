import { neonConfig } from '@neondatabase/serverless'
import { createClient } from '@vercel/postgres'

if (process.env.VERCEL_ENV === 'development') {
  neonConfig.wsProxy = (host) => `${host}:54330/v1`
  neonConfig.useSecureWebSocket = false
  neonConfig.pipelineTLS = false
  neonConfig.pipelineConnect = false
}

const dbUrl =
  process.env.POSTGRES_URL_NON_POOLING || 'postgres://postgres:postgres@localhost:5432/ipe_db'
const db = createClient({ connectionString: dbUrl })
await db.connect()
export { db }
