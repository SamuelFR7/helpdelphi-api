import { UseCaseError } from '@/application/errors/use-case-error'
import { db } from '@/infra/db'
import { type Action, type Ticket, actions, tickets } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'

export async function getUniqueTicketUseCase(ticketId: string): Promise<
  Ticket & {
    actions: Action[]
  }
> {
  const ticketQuery = await db
    .select()
    .from(tickets)
    .where(eq(tickets.id, ticketId))

  const ticket = ticketQuery[0]

  if (!ticket) {
    throw new UseCaseError('Ticket not found')
  }

  const actionsQuery = await db
    .select()
    .from(actions)
    .where(eq(actions.ticketId, ticketId))

  return {
    ...ticket,
    actions: actionsQuery,
  }
}
