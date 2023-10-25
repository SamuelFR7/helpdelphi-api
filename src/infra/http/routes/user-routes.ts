import type { FastifyInstance } from 'fastify'
import { register } from '../controllers/users/register'
import { listUsersController } from '../controllers/users/list-users'
import { deleteUserController } from '../controllers/users/delete-user'
import { authenticateUserController } from '../controllers/users/authenticate-user'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', { onRequest: [verifyJwtMiddleware] }, register)
  app.get<{
    Querystring: {
      page: string
      search: string
    }
  }>('/users', { onRequest: [verifyJwtMiddleware] }, listUsersController)
  app.delete(
    '/users/:id',
    { onRequest: [verifyJwtMiddleware] },
    deleteUserController
  )
  app.post('/users/session', authenticateUserController)
}
