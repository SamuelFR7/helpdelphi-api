import { createId } from '@paralleldrive/cuid2'
import {
  mysqlTable,
  varchar,
  mysqlEnum,
  timestamp,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
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
  role: mysqlEnum('role', ['TECNICO', 'CLIENTE']).notNull(),
  username: varchar('username', { length: 191 }).unique().notNull(),
  password: varchar('password', { length: 191 }).notNull(),
})

export type User = typeof users.$inferInsert

export const tickets = mysqlTable('tickets', {
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
  criticality: varchar('criticality', { length: 191 }).notNull(),
  status: mysqlEnum('status', ['OPEN', 'CLOSED']).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  uddatedAt: timestamp('updated_at', { mode: 'date' }).onUpdateNow(),
})

export type Ticket = typeof tickets.$inferInsert
