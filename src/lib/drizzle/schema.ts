import { text, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});
