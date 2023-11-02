import { UseCaseError } from '@/application/errors/use-case-error'
import { type updateTicketSchema } from '@/core/validations/ticket'
import { db } from '@/infra/db'
import { actions, tickets } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'
import { type z } from 'zod'

export async function updateTicketUseCase(
  input: z.infer<typeof updateTicketSchema> & {
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

  await db.transaction(async (tx) => {
    await tx
      .update(tickets)
      .set({
        status: input.status,
        criticality: input.criticality,
      })
      .where(eq(tickets.id, input.id))
    if (input.actions.length > 0) {
      await tx.insert(actions).values(
        input.actions.flatMap((action) => {
          return {
            description: action.description,
            ticketId: input.id,
          }
        })
      )
    }
  })

  return
}
