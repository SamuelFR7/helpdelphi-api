import { type actionSchema } from '@/core/validations/action'
import { db } from '@/infra/db'
import { actions } from '@/infra/db/schema'
import { type z } from 'zod'

export async function createActionUseCase(input: z.infer<typeof actionSchema>) {
  await db.insert(actions).values(input)
}
