import { db } from '@/db'
import { User, users } from '@/db/schema'
import { searchSchema } from '@/validations/search'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export async function getUsers(
  input: z.infer<typeof searchSchema>
): Promise<User[]> {
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

  return usersSelect
}
