import { db } from '../db'
import { users, type User } from '../db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { userSchema } from '../validations/user'

export async function createUser(
  body: z.infer<typeof userSchema>
): Promise<void> {
  await db.insert(users).values({
    ...body,
  })
}

export async function getUsers(): Promise<User[]> {
  const usersSelect = await db.select().from(users)
  return usersSelect
}

export async function getUniqueUser(id: number): Promise<User> {
  const userQuery = await db.select().from(users).where(eq(users.id, id))

  const userSelected = userQuery[0]

  if (!userSelected) {
    throw new Error('User not found')
  }

  return userSelected
}

export async function updateUser(
  input: z.infer<typeof userSchema> & {
    id: number
  }
): Promise<void> {
  await db
    .update(users)
    .set({
      ...input,
    })
    .where(eq(users.id, input.id))
}

export async function deleteUser(id: number): Promise<void> {
  await db.delete(users).where(eq(users.id, id))
}
