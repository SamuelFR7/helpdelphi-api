import { createTicketUseCase } from '@/application/tickets/use-cases/create-ticket-use-case'
import { ticketSchemaHttp } from '@/core/validations/ticket'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createTicketController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { sub } = req.user

  const body = ticketSchemaHttp.parse(req.body)

  await createTicketUseCase({
    clientId: sub,
    ...body,
  })

  return res.status(201).send({
    message: 'Ticket created',
  })
}
