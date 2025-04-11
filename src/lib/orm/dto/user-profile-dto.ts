export interface UserProfileDto {
	userId: string
	firstName: string
	lastName: string
	email: string
	phone: string
	bio: string
	linkedin: string
	github: string
	skills: string[]
}


export interface UserProfileCreateDto {
	id: number
	userId: string
	firstName: string
	lastName: string
	email: string
	phone: string
	bio: string
	linkedin: string
	github: string
	skills: string[]
}