// src/env.mjs
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['production', 'dev']).default('dev'),
    DATABASE_HOST: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_DB: z.string(),
    DATABASE_USER: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_DB: process.env.DATABASE_DB,
    DATABASE_USER: process.env.DATABASE_USER,
  },
})
