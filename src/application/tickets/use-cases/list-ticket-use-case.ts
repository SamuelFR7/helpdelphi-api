import { UseCaseError } from '@/application/errors/use-case-error'
import { type PaginatedResult } from '@/core/dto/paginated-result'
import { type searchSchema } from '@/core/validations/search'
import { db } from '@/infra/db'
import { type Ticket, tickets, users } from '@/infra/db/schema'
import { eq, like, sql } from 'drizzle-orm'
import { type z } from 'zod'

type ListTicketUseCaseResponse = Omit<Ticket, 'clientId'> & {
  client: string | null
}

export async function listTicketUseCase(
  input: z.infer<typeof searchSchema>
): Promise<PaginatedResult<ListTicketUseCaseResponse>> {
  const ticketsSelect = await db
    .select({
      id: tickets.id,
      subject: tickets.subject,
      client: users.name,
      status: tickets.status,
      createdAt: tickets.createdAt,
      updatedAt: tickets.updatedAt,
      criticality: tickets.criticality,
    })
    .from(tickets)
    .offset(input.offset)
    .limit(input.limit)
    .where(
      typeof input.search === 'string'
        ? like(tickets.subject, `%${input.search}%`)
        : undefined
    )
    .leftJoin(users, eq(tickets.clientId, users.id))

  const totalCountQuery = await db
    .select({ count: sql<number>`count(*)` })
    .from(tickets)
    .where(
      typeof input.search === 'string'
        ? like(tickets.subject, `%${input.search}%`)
        : undefined
    )

  if (!totalCountQuery[0]) {
    throw new UseCaseError('Something went wrong')
  }

  const totalCount = totalCountQuery[0].count

  return {
    items: ticketsSelect,
    totalCount,
  }
}
