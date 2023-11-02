import { updateTicketUseCase } from '@/application/tickets/use-cases/update-ticket-use-case'
import { updateTicketSchema } from '@/core/validations/ticket'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function updateTicketController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { criticality, status, actions } = updateTicketSchema.parse(req.body)
  const { id } = paramsSchema.parse(req.params)

  await updateTicketUseCase({
    criticality,
    status,
    id,
    actions,
  })

  return res.status(200).send({
    message: 'Ticket updated',
  })
}
