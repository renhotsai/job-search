import { z } from "zod";


export const UserWorkExperienceSchema = z.object({
	company: z.string().min(1,{
		message: "School name is required"
	}),
	jobTitle: z.string().min(2, {
		message: "Job Title is required"
	}),
	jobDescription: z.string(),
	startDate: z.date(),
	endDate: z.date(),
}).refine(
	(data) => data.startDate <= data.endDate,
	{
		path: ["endDate"],
		message: "Graduation date must be after start date",
	}
);


export type UserWorkExperienceType = z.infer<typeof UserWorkExperienceSchema>