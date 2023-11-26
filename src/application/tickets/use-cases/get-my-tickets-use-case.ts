import { db } from '@/infra/db'
import { type Ticket, tickets } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const requestSchema = z.object({
  userId: z.string(),
})

export async function GetMyTicketsUseCase(
  input: z.infer<typeof requestSchema>
): Promise<Ticket[]> {
  const ticketsQuery = await db
    .select()
    .from(tickets)
    .where(eq(tickets.clientId, input.userId))

  return ticketsQuery
}
