import type { Config } from 'drizzle-kit'

import dotenv from 'dotenv'

dotenv.config()

export default {
  schema: './src/infra/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
  out: './drizzle',
} satisfies Config
