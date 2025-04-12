import { z } from "zod";

export const UserProfileSchema = z.object({
	lastName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email(),
	firstName: z.string().min(2, {
		message: "Full name must be at least 2 characters.",
	}),
	phone: z.string(),
	bio: z.string().max(500, {
		message: "Bio must not exceed 500 characters.",
	}),
	linkedin: z.string().url().or(z.literal("")),
	github: z.string().url().or(z.literal("")),
	skills: z.array(z.string()),
})



export type UserProfileType = z.infer<typeof UserProfileSchema>