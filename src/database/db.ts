import { createClient } from "@vercel/postgres";

const dbUrl = process.env.POSTGRES_URL_NON_POOLING || ''
export const db = createClient({ connectionString: dbUrl })
