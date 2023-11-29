import { getLastNumberUseCase } from '@/application/tickets/use-cases/get-last-number-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function getLastNumberController(
  _req: FastifyRequest,
  res: FastifyReply
) {
  const number = await getLastNumberUseCase()

  return res.status(200).send({
    number,
  })
}
