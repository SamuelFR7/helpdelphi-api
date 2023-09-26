import { registerUseCase } from '@/use-cases/user/register-use-case'
import { userSchema } from '@/validations/user'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const body = userSchema.parse(req.body)

  await registerUseCase(body)

  return res.status(201).send({
    message: 'User created',
  })
}