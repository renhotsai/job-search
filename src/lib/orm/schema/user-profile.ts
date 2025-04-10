import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userProfile = pgTable('user_profile', {
	id: uuid("id").primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
	phone: text("phone").notNull(),
	bio: text("bio").notNull(),
	linkedin: text("linkedin").notNull(),
	github: text("github").notNull(),
	skills: text("skills").array().notNull(),
	updateDate:timestamp('update_date')
});
