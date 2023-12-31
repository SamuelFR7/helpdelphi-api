import { listUsersUseCase } from '@/application/users/use-cases/list-users-use-case'
import { querySchema } from '@/core/validations/search'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsersController(
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

  const { items, totalCount } = await listUsersUseCase({
    offset,
    search,
    limit,
  })

  return res.status(200).send({
    items,
    totalCount,
  })
}
