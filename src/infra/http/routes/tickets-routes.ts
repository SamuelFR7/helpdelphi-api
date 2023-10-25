import { type FastifyInstance } from 'fastify'
import { createTicketController } from '../controllers/tickets/create-ticket'
import { listTicketController } from '../controllers/tickets/list-ticket'
import { updateTicketController } from '../controllers/tickets/update-ticket'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt'
import { verifyUserClient } from '../middlewares/verify-user-client'
import { deleteTicketController } from '../controllers/tickets/delete-ticket'

export async function ticketsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post(
    '/tickets',
    { onRequest: [verifyJwtMiddleware, verifyUserClient] },
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
    { onRequest: [verifyJwtMiddleware, verifyUserClient] },
    deleteTicketController
  )
}
