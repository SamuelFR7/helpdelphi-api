import { db } from '@/infra/db'
import { users } from '@/infra/db/schema'
import { type userSchema } from '@/core/validations/user'
import { type z } from 'zod'
import bcryptjs from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { UseCaseError } from '@/application/errors/use-case-error'

export async function registerUseCase(
  input: z.infer<typeof userSchema>
): Promise<void> {
  const userAlreadyExists = await db
    .select()
    .from(users)
    .where(eq(users.username, input.username))

  if (userAlreadyExists[0]) {
    throw new UseCaseError('User already exists')
  }

  const hashPassword = await bcryptjs.hash(input.password, 8)

  await db.insert(users).values({
    id: createId(),
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
