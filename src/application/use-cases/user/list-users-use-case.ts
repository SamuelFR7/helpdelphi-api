import { db } from '@/infra/db'
import { type User, users } from '@/infra/db/schema'
import type { PaginatedResult } from '@/core/dto/paginated-result'
import type { searchSchema } from '@/core/validations/search'
import { like, sql } from 'drizzle-orm'
import type { z } from 'zod'

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
        ? like(users.name, `%${input.search}%`)
        : undefined
    )

  const totalCountQuery = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(
      typeof input.search === 'string'
        ? like(users.name, `%${input.search}%`)
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
