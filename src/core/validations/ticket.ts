import { z } from 'zod'

export const ticketSchema = z.object({
  clientId: z.string(),
  subject: z.string().toUpperCase(),
  criticality: z.enum(['low', 'medium', 'high']),
  status: z.enum(['waiting', 'in_progress', 'stopped', 'finished']),
})

export const updateTicketSchema = z.object({
  criticality: z.enum(['low', 'medium', 'high']),
  status: z.enum(['waiting', 'in_progress', 'stopped', 'finished']),
  actions: z
    .object({
      description: z.string(),
    })
    .array(),
})
