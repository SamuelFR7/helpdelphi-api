import { z } from 'zod'

export const searchSchema = z.object({
  offset: z.number(),
  limit: z.number().default(10),
  search: z.string().optional(),
})

export const querySchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
})
