import { db } from '@/db'
import { users } from '@/db/schema'
import { userSchema } from '@/validations/user'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { eq } from 'drizzle-orm'

export async function registerUseCase(
  input: z.infer<typeof userSchema>
): Promise<void> {
  const userAlreadyExists = await db
    .select()
    .from(users)
    .where(eq(users.username, input.username))

  if (!userAlreadyExists[0]) {
    throw new Error('User already exists')
  }

  const hashPassword = await bcryptjs.hash(input.password, 8)

  await db.insert(users).values({
    password: hashPassword,
    username: input.username,
    name: input.name,
    email: input.email,
    company: input.company,
    role: input.role,
    phone: input.phone,
    document: input.document,
  })
}
