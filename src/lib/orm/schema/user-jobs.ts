import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userJobs = pgTable('user_jobs', {
	id: serial("id").primaryKey(),
	userId: text("user_id").notNull(),
	jobId: text("job_id").primaryKey(),
	jobTitle: text("job_title"),
	jobDescription: text("job_description"),
	companyName: text("company_name"),
	companyUrl: text("company_url"),
	location: text("location"),
	jobUrl: text("job_url"),
	applyUrl: text("apply_url"),
	seniorityLevel: text("seniority_level"),
	employmentType: text("employment_type"),
	industries: text("industries"),
	jobFunction: text("job_function"),
	numApplicants:text("num_applicants"),
	salaryRange: text("salary_range"),
	timePosted: text("time_posted"),
	status:integer("status"),
	updateDate:timestamp('update_date').defaultNow().notNull(),
});