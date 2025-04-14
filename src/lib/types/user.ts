import { UserJobsEnums } from "@/lib/types/enums";

export interface UserProfile {
	id:number
	userId: string
	firstName: string
	lastName: string
	email: string
	phone: string
	bio: string
	linkedin: string
	github: string
	skills: string[]
	updateDate: Date
}

export interface UserEducation {
	id: number
	userId: string
	school: string
	degree: string
	fieldOfStudy: string
	startDate: Date
	endDate: Date
	updateDate: Date
}

export interface UserWorkExperience {
	id: number
	userId: string
	company: string
	jobTitle: string
	jobDescription: string
	startDate: Date
	endDate: Date
	updateDate: Date
}

export interface  UserJob {
	id: number
	userId: string
	jobId: string
	jobTitle: string | null
	jobDescription: string | null
	companyName: string | null
	companyUrl: string | null
	location: string | null
	jobUrl: string | null
	applyUrl: string | null,
	seniorityLevel: string | null,
	employmentType: string | null
	industries: string | null
	jobFunction: string | null
	numApplicants:string | null
	salaryRange: string | null
	timePosted: string | null
	status: UserJobsEnums
}


