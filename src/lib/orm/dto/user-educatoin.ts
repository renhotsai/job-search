
export interface UserEducationDto {
	id:number
	userId: string
	school: string
	degree: string
	fieldOfStudy: string
	startDate: Date
	endDate: Date
}

export interface UserEducationCreateDto {
	userId: string
	school: string
	degree: string
	fieldOfStudy: string
	startDate: Date
	endDate: Date
}