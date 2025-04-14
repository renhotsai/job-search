import { z } from "zod"

export const UserEducationCreateSchema = z.object({
	userId: z.string(),
	jobId: z.string(),
	jobTitle: z.string(),
	jobDescription: z.string(),
	companyName: z.string(),
	companyUrl: z.string(),
	location: z.string(),
	jobUrl: z.string(),
	applyUrl: z.string(),
	seniorityLevel: z.string(),
	employmentType: z.string(),
	industries: z.string(),
	jobFunction: z.string(),
	num_applicants: z.string(),
	salary_range: z.string(),
	time_posted: z.string(),
})

// 可重複使用的陣列 schema
export const UserEducationCreateArray = z.array(UserEducationCreateSchema)


export interface UserEducationCreateDto {
	userId: string,
	jobId: string,
	jobTitle: string,
	jobDescription: string,
	companyName: string,
	companyUrl: string,
	location: string,
	jobUrl: string,
	applyUrl: string,
	seniorityLevel: string,
	employmentType: string,
	industries: string,
	jobFunction: string,
	num_applicants:string,
	salary_range:string,
	time_posted:string,
}

