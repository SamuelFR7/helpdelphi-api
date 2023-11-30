import { z } from 'zod'

export const actionSchema = z.object({
  description: z.string(),
  ticketId: z.string(),
  previousStatus: z.enum(['waiting', 'in_progress', 'stopped', 'finished']),
  newStatus: z.enum(['waiting', 'in_progress', 'stopped', 'finished']),
})
