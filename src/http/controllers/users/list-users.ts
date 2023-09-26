import { listUsersUseCase } from '@/use-cases/user/list-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
})

export async function listUsersController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { page, search } = paramsSchema.parse(req.params)

  const limit = 10

  const offset =
    typeof page === 'string' ? (parseInt(page) > 0 ? parseInt(page) : 1) : 1

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
