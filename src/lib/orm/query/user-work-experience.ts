'use server'

import { db } from "@/lib/orm/db";
import { userWorkExperience } from "../schema/user-work-experience";
import { eq } from "drizzle-orm";
import { UserWorkExperienceCreateDto } from "@/lib/orm/dto/user-work-experience";

export const getUserWorkExperienceFromDB = async (userId: string) => {
	try {
		return db.select().from(userWorkExperience).where(eq(userWorkExperience.userId, userId))
	} catch (error) {
		throw error
	}
}

export const insertUserWorkExperienceToDB = async (data: UserWorkExperienceCreateDto) => {
	try {
		const result = await db.insert(userWorkExperience).values(data).returning()
		return result[0]
	} catch (error) {
		throw error
	}
}

export const removeUserWorkExperienceFromDB = async (id: number) => {
	try {
		const result = await db.delete(userWorkExperience).where(eq(userWorkExperience.id, id)).returning()

		console.log(`result:${JSON.stringify(result)}`)
		return result[0]
	} catch (error) {
		throw error
	}
}