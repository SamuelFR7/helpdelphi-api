import { GetMyTicketsUseCase } from '@/application/tickets/use-cases/get-my-tickets-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listMyTicketsController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { sub } = req.user

  const tickets = await GetMyTicketsUseCase({
    userId: sub,
  })

  return res.status(200).send({
    items: tickets,
  })
}
