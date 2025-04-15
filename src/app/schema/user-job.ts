import { z } from "zod";

export const UserJobSchema = z.object({
	experienceLevel: z.string(),
	jobTitle: z.string().min(2,{
		message: "Job title is required"
	}),
	jobType: z.string(),
	location: z.string().min(2, {
		message: "Location is required"
	}),
	workSchedule: z.string(),
	job_post_time: z.string(),
	jobs_entries: z.number(),
});

export type UserJobSchemaType =z.infer<typeof UserJobSchema>