import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const skills = pgTable('skills', {
	id: integer("id").primaryKey(),
	skillName: text("skill_name").notNull(),
	category: text("category").notNull(),
});