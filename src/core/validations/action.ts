import { z } from 'zod'

export const actionSchema = z.object({
  description: z.string(),
  ticketId: z.string(),
})
