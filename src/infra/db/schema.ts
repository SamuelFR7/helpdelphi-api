import { createId } from '@paralleldrive/cuid2'
import { pgTable, varchar, pgEnum, timestamp } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['client', 'admin', 'technician'])

export const users = pgTable('users', {
  id: varchar('id', {
    length: 191,
  })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 191 }).notNull(),
  company: varchar('company', { length: 191 }).notNull(),
  email: varchar('email', { length: 191 }).notNull(),
  document: varchar('document', { length: 191 }).notNull(),
  phone: varchar('phone', { length: 11 }).notNull(),
  role: roleEnum('role'),
  username: varchar('username', { length: 191 }).unique().notNull(),
  password: varchar('password', { length: 191 }).notNull(),
})

export type User = typeof users.$inferInsert

export const statusEnum = pgEnum('status', [
  'waiting',
  'in_progress',
  'stopped',
  'finished',
])
export const criticalityEnum = pgEnum('criticality', ['low', 'medium', 'high'])

export const tickets = pgTable('tickets', {
  id: varchar('id', {
    length: 191,
  })
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  clientId: varchar('client_id', {
    length: 191,
  })
    .references(() => users.id)
    .notNull(),
  subject: varchar('subject', { length: 191 }).notNull(),
  criticality: criticalityEnum('criticality').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }),
})

export type Ticket = typeof tickets.$inferInsert

export const actions = pgTable('action', {
  id: varchar('id', {
    length: 191,
  }),
  description: varchar('description', {
    length: 191,
  }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }),
  ticketId: varchar('ticket_id', { length: 191 })
    .references(() => tickets.id)
    .notNull(),
})

export type Action = typeof actions.$inferSelect
