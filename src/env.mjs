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
    JWT_SECRET: z.string(),
    PORT: z.number().default(3333),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_DB: process.env.DATABASE_DB,
    DATABASE_USER: process.env.DATABASE_USER,
    JWT_SECRET: process.env.JWT_SECRET,
  },
})
