// src/env.mjs
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['production', 'development']).default('development'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    PORT: z
      .string()
      .transform((arg) => Number(arg))
      .default('3333'),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
  },
})
