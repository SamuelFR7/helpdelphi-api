import { deleteUserUseCase } from '@/application/users/use-cases/delete-user-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function deleteUserController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { id } = paramsSchema.parse(req.params)

  await deleteUserUseCase({
    userId: parseInt(id),
  })

  return res.status(200).send({
    message: 'User deleted',
  })
}
