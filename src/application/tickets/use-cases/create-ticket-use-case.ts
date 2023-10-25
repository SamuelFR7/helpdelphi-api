import { type ticketSchema } from '@/core/validations/ticket'
import { db } from '@/infra/db'
import { tickets } from '@/infra/db/schema'
import { type z } from 'zod'

export async function createTicketUseCase(
  input: z.infer<typeof ticketSchema>
): Promise<void> {
  await db.insert(tickets).values(input)

  return
}
