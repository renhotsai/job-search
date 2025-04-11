import { db } from "@/lib/orm/db";
import { userWorkExperience } from "../schema/user-work-experience";
import { eq } from "drizzle-orm";
import { UserWorkExperienceCreateDto } from "@/lib/orm/dto/user-work-experience";

export const getUserWorkExperienceFromDB = async (userId: string) => {
	return db.select().from(userWorkExperience).where(eq(userWorkExperience.userId, userId))
}

export const insertUserWorkExperienceToDB=async (data:UserWorkExperienceCreateDto)=>{

	return ""
}

export const removeUserWorkExperienceFromDB = async (id: number) => {
	return ""
}