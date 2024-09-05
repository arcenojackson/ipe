import { createClient } from '@vercel/postgres'

const dbUrl = process.env.POSTGRES_URL_NON_POOLING || ''
const db = createClient({ connectionString: dbUrl })
await db.connect()
export { db }
