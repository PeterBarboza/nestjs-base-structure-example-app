import { text, pgTable, uuid, timestamp, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});
export const userRelations = relations(users, ({ many }) => ({
  products: many(products, { relationName: 'usersProducts' }),
}));

export const products = pgTable('products', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  name: text('name').notNull(),
  price: numeric('price', { precision: 12, scale: 2 }),
  ownerId: uuid('ownerId')
    .notNull()
    .references(() => users.id),
});
export const productsRelations = relations(products, ({ one }) => ({
  owner: one(users, {
    relationName: 'usersProducts',
    fields: [products.ownerId],
    references: [users.id],
  }),
}));
