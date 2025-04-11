import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const degrees = pgTable('degrees', {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
	type: text("type").notNull(),
});