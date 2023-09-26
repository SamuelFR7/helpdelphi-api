import { db } from '@/infra/db'
import { users } from '@/infra/db/schema'
import { eq } from 'drizzle-orm'

export async function deleteUserUseCase({
  userId,
}: {
  userId: number
}): Promise<void> {
  await db.delete(users).where(eq(users.id, userId))
}
