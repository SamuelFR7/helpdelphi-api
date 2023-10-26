import type { Roles } from '@/@types/roles'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRoleMiddleware(rolesToVerify: Roles[]) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const { role } = req.user

    if (!rolesToVerify.includes(role)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
  }
}
