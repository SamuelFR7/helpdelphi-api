import { createActionUseCase } from '@/application/actions/use-cases/create-action-use-case'
import { actionSchema } from '@/core/validations/action'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createActionController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const body = actionSchema.parse(req.body)

  await createActionUseCase(body)

  return res.status(201).send({
    message: 'Action created',
  })
}
