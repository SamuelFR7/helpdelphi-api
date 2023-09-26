import { FastifyInstance } from 'fastify'
import { register } from './register'
import { listUsersController } from './list-users'
import { deleteUserController } from './delete-user'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get<{
    Querystring: {
      page: string
      search: string
    }
  }>('/users', listUsersController)
  app.delete('/users/:id', deleteUserController)
}
