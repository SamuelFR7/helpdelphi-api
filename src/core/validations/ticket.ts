import { z } from 'zod'

export const ticketSchema = z.object({
  clientId: z.string(),
  subject: z.string().toUpperCase(),
  criticality: z.string().toUpperCase(),
  status: z.enum(['OPEN', 'CLOSED']),
})
