import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserAdmin(req: FastifyRequest, res: FastifyReply) {
  const { role } = req.user

  if (role !== 'admin') {
    return res.status(401).send({ message: 'Unauthorized.' })
  }
}
