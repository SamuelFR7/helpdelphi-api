import { db } from '@/infra/db'
import { type Ticket, tickets, users } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const requestSchema = z.object({
  userId: z.string(),
})

export async function GetMyTicketsUseCase(
  input: z.infer<typeof requestSchema>
): Promise<Ticket[]> {
  const ticketsQuery = await db
    .select({
      id: tickets.id,
      subject: tickets.subject,
      criticality: tickets.criticality,
      status: tickets.status,
      createdAt: tickets.createdAt,
      updatedAt: tickets.updatedAt,
      clientId: tickets.clientId,
      user: {
        name: users.name,
      },
    })
    .from(tickets)
    .innerJoin(users, eq(tickets.clientId, users.id))
    .where(eq(tickets.clientId, input.userId))

  return ticketsQuery
}
