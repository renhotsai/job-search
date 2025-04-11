import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { userProfile } from "@/lib/orm/schema/user-profile";

export const userEducation = pgTable('user_education', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull(),
	school: text('school').notNull(),
	degree: text('degree').notNull(),
	fieldOfStudy: text('field_of_study').notNull(),
	startDate: date('start_date', {mode: 'date'}).notNull(),
	endDate: date('end_date', {mode: 'date'}).notNull(),
	updateDate:timestamp('update_date').defaultNow().notNull(),
})

export const userEducationRelations = relations(userEducation, ({one}) => ({
	user: one(userProfile, {
		fields: [userEducation.userId],
		references: [userProfile.id],
	}),
}));