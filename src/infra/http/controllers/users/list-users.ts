import { listUsersUseCase } from '@/application/use-cases/user/list-users-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
})

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
