import { UseCaseError } from '@/application/errors/use-case-error'
import { type ticketSchema } from '@/core/validations/ticket'
import { db } from '@/infra/db'
import { tickets } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'
import { type z } from 'zod'

export async function updateTicketUseCase(
  input: z.infer<typeof ticketSchema> & {
    id: string
  }
): Promise<void> {
  const ticketToUpdateQuery = await db
    .select()
    .from(tickets)
    .where(eq(tickets.id, input.id))

  const ticketToUpdate = ticketToUpdateQuery[0]

  if (!ticketToUpdate) {
    throw new UseCaseError('Ticket not found')
  }

  await db.update(tickets).set(input).where(eq(tickets.id, input.id))

  return
}
