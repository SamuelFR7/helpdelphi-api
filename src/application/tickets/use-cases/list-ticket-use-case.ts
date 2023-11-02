import { UseCaseError } from '@/application/errors/use-case-error'
import { type PaginatedResult } from '@/core/dto/paginated-result'
import { type searchSchema } from '@/core/validations/search'
import { db } from '@/infra/db'
import { type Ticket, tickets, type Action, type User } from '@/infra/db/schema'
import { like, sql } from 'drizzle-orm'
import { type z } from 'zod'

type ListTicketUseCaseResponse = Ticket & {
  actions: Action[]
  user: Pick<User, 'name'>
}

export async function listTicketUseCase(
  input: z.infer<typeof searchSchema>
): Promise<PaginatedResult<ListTicketUseCaseResponse>> {
  const ticketsSelect = await db.query.tickets.findMany({
    with: {
      actions: true,
      user: {
        columns: {
          name: true,
        },
      },
    },
    offset: input.offset,
    limit: input.limit,
    where: (tickets, { like }) =>
      typeof input.search === 'string'
        ? like(tickets.subject, `%${input.search}%`)
        : undefined,
  })

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
