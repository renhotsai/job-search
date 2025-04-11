'use server'

import { db } from "@/lib/orm/db";
import { userProfile } from "@/lib/orm/schema/user-profile";
import { eq } from "drizzle-orm";
import { UserProfileDto } from "@/lib/orm/dto/user-profile-dto";

export const getUserProfileFromDB = async (userId: string) => {
	try {
		return db.select().from(userProfile).where(eq(userProfile.userId, userId))
			.then(res => res[0] || null)
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const insertUserProfile = async (userProfileToInsert:UserProfileDto) => {

		await db.insert(userProfile).values(userProfileToInsert)
			.onConflictDoUpdate({
				target: userProfile.userId,
				set: userProfileToInsert,
			});
		const result = await db.select().from(userProfile).where(eq(userProfile.userId, userProfileToInsert.userId))
		return result[0].updateDate
}
