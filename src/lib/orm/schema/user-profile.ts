import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userEducation } from "@/lib/orm/schema/user-education";
import { userWorkExperience } from "@/lib/orm/schema/user-work-experience";

export const userProfile = pgTable('user_profile', {
	id: serial('id'),
	userId: uuid("user_id").notNull().primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
	phone: text("phone").notNull(),
	bio: text("bio").notNull(),
	linkedin: text("linkedin").notNull(),
	github: text("github").notNull(),
	skills: text("skills").array().notNull(),
	updateDate:timestamp('update_date').defaultNow().notNull(),
});

export const usersProfileRelations = relations(userProfile, ({ many }) => ({
	educations: many(userEducation),
	workExperiences: many(userWorkExperience),
}));
