import type { Config } from 'drizzle-kit'

export default {
  schema: './src/infra/db/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DATABASE_HOST ?? '',
    user: process.env.DATABASE_USER ?? '',
    password: process.env.DATABASE_PASSWORD ?? '',
    database: process.env.DATABASE_DB ?? '',
  },
  out: './drizzle',
} satisfies Config
