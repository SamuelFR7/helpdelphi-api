import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserTechnician(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { role } = req.user

  if (role !== 'technician') {
    return res.status(401).send({ message: 'Unauthorized.' })
  }
}
