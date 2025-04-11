import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { userProfile } from "@/lib/orm/schema/user-profile";

export const userWorkExperience = pgTable('user_work_experience', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull(),
	company: text('company').notNull(),
	jobTitle: text('job_title').notNull(),
	jobDescription: text('job_description').notNull(),
	startDate: date('start_date', {mode: 'date'}).notNull(),
	endDate: date('end_date', {mode: 'date'}).notNull(),
	updateDate:timestamp('update_date').defaultNow().notNull(),
})

export const userWorkExperienceRelations = relations(userWorkExperience, ({one}) => ({
	user: one(userProfile, {
		fields: [userWorkExperience.userId],
		references: [userProfile.id],
	}),
}));