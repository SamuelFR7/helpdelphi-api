import { type FastifyInstance } from 'fastify'
import { createTicketController } from '../controllers/tickets/create-ticket'
import { listTicketController } from '../controllers/tickets/list-ticket'
import { updateTicketController } from '../controllers/tickets/update-ticket'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt'

export async function ticketsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post('/tickets', createTicketController)
  app.get<{
    Querystring: {
      page: string
      search: string
    }
  }>('/tickets', listTicketController)
  app.patch('/tickets/:id', updateTicketController)
}
