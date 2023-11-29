import { type FastifyInstance } from 'fastify'
import { createTicketController } from '../controllers/tickets/create-ticket'
import { listTicketController } from '../controllers/tickets/list-ticket'
import { updateTicketController } from '../controllers/tickets/update-ticket'
import { verifyJwtMiddleware } from '../middlewares/verify-jwt'
import { deleteTicketController } from '../controllers/tickets/delete-ticket'
import { verifyRoleMiddleware } from '../middlewares/verify-role'
import { getUniqueTicketController } from '../controllers/tickets/get-unique-ticket'
import { listMyTicketsController } from '../controllers/tickets/list-my-tickets'
import { getLastNumberController } from '../controllers/tickets/get-last-number'

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
  }>(
    '/tickets',
    {
      onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['technician'])],
    },
    listTicketController
  ),
    app.get(
      '/tickets/me',
      {
        onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['client'])],
      },
      listMyTicketsController
    ),
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
      onRequest: [
        verifyJwtMiddleware,
        verifyRoleMiddleware(['admin', 'technician']),
      ],
    },
    getUniqueTicketController
  ),
    app.get(
      '/tickets/number',
      {
        onRequest: [verifyJwtMiddleware, verifyRoleMiddleware(['client'])],
      },
      getLastNumberController
    )
}
