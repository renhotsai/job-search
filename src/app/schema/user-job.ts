import { z } from "zod";

export const UserJobSchema = z.object({
	experienceLevel: z.string(),
	jobTitle: z.string(),
	jobType: z.string(),
	location: z.string(),
	workSchedule: z.string(),
	job_post_time: z.string(),
	jobs_entries: z.number(),
});

export type UserJobSchemaType =z.infer<typeof UserJobSchema>