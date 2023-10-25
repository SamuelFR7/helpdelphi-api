import { UseCaseError } from '@/application/errors/use-case-error'
import { type authSchema } from '@/core/validations/user'
import { db } from '@/infra/db'
import { type User, users } from '@/infra/db/schema'
import bcryptjs from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { type z } from 'zod'

export async function authenticateUserUseCase(
  input: z.infer<typeof authSchema>
): Promise<Omit<User, 'password'>> {
  const userQuery = await db
    .select()
    .from(users)
    .where(eq(users.username, input.username))

  const user = userQuery[0]

  if (!user) {
    throw new UseCaseError('Username or password incorrect')
  }

  const passwordMatch = await bcryptjs.compare(input.password, user.password)

  if (!passwordMatch) {
    throw new UseCaseError('Username or password incorrect')
  }

  return {
    ...user,
  }
}
