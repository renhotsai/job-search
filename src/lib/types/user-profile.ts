type UserProfile = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string | null;
	bio: string | null;
	linkedin: string | null;
	github: string | null;
	skills: string[] | null;
}

export type { UserProfile }