import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const fieldOfStudy = pgTable('field_of_study', {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});