import { z } from "zod";

export const UserEducationSchema = z.object({
	school: z.string().min(1,{
		message: "School name is required"
	}),
	degree: z.string().min(1, {
		message: "Degree is required"
	}),
	fieldOfStudy: z.string().min(1, {
		message: "Field of study is required"
	}),
	startDate: z.date(),
	endDate: z.date(),
}).refine(
	(data) => data.startDate <= data.endDate,
	{
		path: ["endDate"],
		message: "Graduation date must be after Start date",
	}
);


export type UserEducationType = z.infer<typeof UserEducationSchema>