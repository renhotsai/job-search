import { z } from "zod";

export const educationSchema = z.object({
	school: z.string(),
	degree: z.string(),
	fieldOfStudy: z.string(),
	startDate: z.string(),
	endDate: z.string(),
})


export type UserEducation = z.infer<typeof educationSchema>