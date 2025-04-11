'use server'

import { db } from "../db"
import { userEducation } from "../schema/user-education"
import { eq } from "drizzle-orm";
import { UserEducationCreateDto } from "@/lib/orm/dto/user-educatoin";

export const getUserEducationFromDB = async (userId: string) => {
	try {
		return db.select().from(userEducation).where(eq(userEducation.userId, userId));
	} catch (error) {
		throw error
	}
}

export const insertUserEducationToDB = async (data: UserEducationCreateDto) => {
	try {
		const result = await db.insert(userEducation).values(data).returning()
		return result[0]
	} catch (error) {
		throw error
	}
}

export const removeUserEducationFromDB = async (id: number) => {
	try {
		const result = await db.delete(userEducation).where(eq(userEducation.id, id)).returning()
		return result[0]
	} catch (error) {
		throw error
	}
}