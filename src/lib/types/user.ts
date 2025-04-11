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