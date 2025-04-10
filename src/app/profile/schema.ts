import { z } from "zod";


const educationSchema = z.object({
	school: z.string(),
	degree: z.string(),
	fieldOfStudy: z.string(),
	startDate: z.string(),
	endDate: z.string(),
})

const profileSchema = z.object({
	lastName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email(),
	firstName: z.string().min(2, {
		message: "Full name must be at least 2 characters.",
	}),
	phone: z.string()
		.refine(val => val === "" || /^\d{10}$/.test(val), {
			message: "Phone number must be 10 digits or empty",
		}),
	bio: z.string().max(500, {
		message: "Bio must not exceed 500 characters.",
	}).optional(),
	linkedin: z.string().url().optional().or(z.literal("")),
	github: z.string().url().optional().or(z.literal("")),
	skill: z.array(z.string()).optional(),
})


export { profileSchema, educationSchema }