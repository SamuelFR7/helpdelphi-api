import { z } from 'zod'

export const ticketSchema = z.object({
  clientId: z.string(),
  subject: z.string().toUpperCase(),
  description: z.string().toUpperCase(),
  criticality: z.number().min(1).max(3),
  status: z.enum(['waiting', 'in_progress', 'stopped', 'finished']),
})

export const ticketSchemaHttp = z.object({
  subject: z.string().toUpperCase(),
  criticality: z.number().min(1).max(3),
  description: z.string().toUpperCase(),
  status: z.enum(['waiting', 'in_progress', 'stopped', 'finished']),
})

export const updateTicketSchema = z.object({
  criticality: z.number().min(1).max(3),
  status: z.enum(['waiting', 'in_progress', 'stopped', 'finished']),
  actions: z
    .object({
      description: z.string(),
    })
    .array(),
})
