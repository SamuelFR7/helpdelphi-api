import { updateTicketUseCase } from '@/application/tickets/use-cases/update-ticket-use-case'
import { ticketSchema } from '@/core/validations/ticket'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function updateTicketController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { clientId, criticality, status, subject } = ticketSchema.parse(
    req.body
  )
  const { id } = paramsSchema.parse(req.params)

  await updateTicketUseCase({
    clientId,
    criticality,
    status,
    subject,
    id,
  })

  return res.status(200).send({
    message: 'Ticket updated',
  })
}
