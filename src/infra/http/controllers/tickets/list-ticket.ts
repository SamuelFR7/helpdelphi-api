import { listTicketUseCase } from '@/application/tickets/use-cases/list-ticket-use-case'
import { querySchema } from '@/core/validations/search'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listTicketController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { page, search } = querySchema.parse(req.query)

  const limit = 10

  const offset =
    typeof page === 'string'
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * 10
        : 0
      : 0

  const { items, totalCount } = await listTicketUseCase({
    offset,
    search,
    limit,
  })

  return res.status(200).send({
    items,
    totalCount,
  })
}
