import { mysqlTable, varchar, mysqlEnum } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: varchar('id', {
    length: 191,
  }).notNull(),
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
