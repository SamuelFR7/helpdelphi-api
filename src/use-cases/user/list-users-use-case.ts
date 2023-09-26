import { db } from '@/db'
import { User, users } from '@/db/schema'
import { PaginatedResult } from '@/types/paginated-result'
import { searchSchema } from '@/validations/search'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

export async function listUsersUseCase(
  input: z.infer<typeof searchSchema>
): Promise<PaginatedResult<User>> {
  const usersSelect = await db
    .select()
    .from(users)
    .offset(input.offset)
    .limit(input.limit)
    .where(
      typeof input.search === 'string'
        ? eq(users.name, input.search)
        : undefined
    )

  const totalCountQuery = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(
      typeof input.search === 'string'
        ? eq(users.name, input.search)
        : undefined
    )

  if (!totalCountQuery[0]) {
    throw new Error('Something went wrong')
  }

  const totalCount = totalCountQuery[0].count

  return {
    items: usersSelect,
    totalCount,
  }
}
