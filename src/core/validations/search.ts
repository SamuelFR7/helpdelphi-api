import { z } from 'zod'

export const searchSchema = z.object({
  offset: z.number(),
  limit: z.number().default(10),
  search: z.string().optional(),
})
