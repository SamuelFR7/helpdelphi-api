import { UseCaseError } from '@/application/errors/use-case-error'
import { db } from '@/infra/db'
import { tickets } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'

export async function deleteTicketUseCase({
  id,
}: {
  id: string
}): Promise<void> {
  const ticketExistsQuery = await db
    .select()
    .from(tickets)
    .where(eq(tickets.id, id))

  const ticketExists = ticketExistsQuery[0]

  if (!ticketExists) {
    throw new UseCaseError('Ticket does not exist.')
  }

  await db.delete(tickets).where(eq(tickets.id, id))
}
