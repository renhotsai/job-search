
export interface UserWorkExperience {
	id:number
	userId: string
	company: string
	jobTitle: string
	jobDescription: string
	startDate: Date
	endDate: Date
	updateDate: Date
}

export interface UserWorkExperienceCreateDto {
	userId: string
	company: string
	jobTitle: string
	jobDescription: string
	startDate: Date
	endDate: Date
}