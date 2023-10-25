import { createTicketUseCase } from '@/application/tickets/use-cases/create-ticket-use-case'
import { ticketSchema } from '@/core/validations/ticket'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createTicketController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const body = ticketSchema.parse(req.body)

  await createTicketUseCase(body)

  return res.status(201).send({
    message: 'Ticket created',
  })
}
