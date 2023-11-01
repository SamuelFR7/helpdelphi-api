import { type FastifyInstance } from 'fastify'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt'
import { verifyRoleMiddleware } from '../middlewares/verify-role'
import { createActionController } from '../controllers/actions/create-action'

export async function actionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post(
    '/actions',
    {
      onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['technician'])],
    },
    createActionController
  )
}
