import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserClient(req: FastifyRequest, res: FastifyReply) {
  const { role } = req.user

  if (role !== 'client') {
    return res.status(401).send({ message: 'Unauthorized.' })
  }
}
