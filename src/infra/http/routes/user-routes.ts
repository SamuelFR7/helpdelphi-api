import type { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { listUsersController } from '../controllers/users/list-users'
import { deleteUserController } from '../controllers/users/delete-user'
import { authenticateUserController } from '../controllers/users/authenticate-user'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt'
import { verifyRoleMiddleware } from '../middlewares/verify-role'

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    { onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['admin'])] },
    register
  )
  app.get<{
    Querystring: {
      page: string
      search: string
    }
  }>(
    '/users',
    { onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['admin'])] },
    listUsersController
  )
  app.delete(
    '/users/:id',
    { onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['admin'])] },
    deleteUserController
  )
  app.post('/users/session', authenticateUserController)
}
