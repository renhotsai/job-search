import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userProfile = pgTable('user_profile', {
	id: uuid("id").primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
	phone: text("phone"),
	bio: text("bio"),
	linkedin: text("linkedin"),
	github: text("github"),
	skills: text("skills").array(),
});
