import { type FastifyInstance } from 'fastify'
import { createTicketController } from '../controllers/tickets/create-ticket'
import { listTicketController } from '../controllers/tickets/list-ticket'
import { updateTicketController } from '../controllers/tickets/update-ticket'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt'
import { deleteTicketController } from '../controllers/tickets/delete-ticket'
import { verifyRoleMiddleware } from '../middlewares/verify-role'
import { getUniqueTicketController } from '../controllers/tickets/get-unique-ticket'

export async function ticketsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post(
    '/tickets',
    {
      onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['client'])],
    },
    createTicketController
  )
  app.get<{
    Querystring: {
      page: string
      search: string
    }
  }>('/tickets', { onRequest: [verifyJwtMiddleware] }, listTicketController)
  app.patch(
    '/tickets/:id',
    { onRequest: [verifyJwtMiddleware] },
    updateTicketController
  )
  app.delete(
    '/tickets/:id',
    { onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['client'])] },
    deleteTicketController
  )
  app.get(
    '/tickets/:id',
    {
      onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['technician'])],
    },
    getUniqueTicketController
  )
}
