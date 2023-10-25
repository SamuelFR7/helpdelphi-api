import { deleteTicketUseCase } from '@/application/tickets/use-cases/delete-ticket-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function deleteTicketController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { id } = paramsSchema.parse(req.params)

  await deleteTicketUseCase({ id })

  return res.status(200).send({
    message: 'Ticket deleted',
  })
}
