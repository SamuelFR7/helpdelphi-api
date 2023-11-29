import { db } from '@/infra/db'
import { tickets } from '@/infra/db/schema'
import { desc } from 'drizzle-orm'

export async function getLastNumberUseCase(): Promise<number> {
  const query = await db
    .select({ number: tickets.number })
    .from(tickets)
    .orderBy(desc(tickets.number))

  const result = query[0]

  if (!result) {
    throw new Error('Something went wrong')
  }

  return result.number
}
