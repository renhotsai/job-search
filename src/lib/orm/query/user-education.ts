'use server'

import { db } from "../db"
import { userEducation } from "../schema/user-education"
import { eq } from "drizzle-orm";
import { UserEducationCreateDto } from "@/lib/orm/dto/user-educatoin";

export const getUserEducationFromDB = async (userId: string) => {
	try {

		return await db.select().from(userEducation).where(eq(userEducation.userId, userId));
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const insertUserEducationToDB = async (data: UserEducationCreateDto) => {
	await db.insert(userEducation).values(data);
}

export const removeUserEducationFromDB = async (id:number) =>{
	await db.delete(userEducation).where(eq(userEducation.id, id))
}