import { getUniqueTicketUseCase } from '@/application/tickets/use-cases/get-unique-ticket-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function getUniqueTicketController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { id } = paramsSchema.parse(req.params)

  const ticket = await getUniqueTicketUseCase(id)

  return res.status(200).send(ticket)
}
