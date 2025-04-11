'use server'

import { db } from "@/lib/orm/db";
import { userProfile } from "@/lib/orm/schema/user-profile";
import { eq } from "drizzle-orm";
import { UserProfileCreateDto } from "@/lib/orm/dto/user-profile";

export const getUserProfileFromDB = async (userId: string) => {
	try {
		return db.select().from(userProfile).where(eq(userProfile.userId, userId))
			.then(res => res[0] || null)
	} catch (error) {
		throw error
	}
}

export const insertUserProfile = async (userProfileToInsert: UserProfileCreateDto) => {
	try {
		return db.insert(userProfile).values(userProfileToInsert)
			.onConflictDoUpdate({
				target: userProfile.userId,
				set: userProfileToInsert,
			}).returning({'updateDate': userProfile.updateDate});
	} catch (error) {
		throw error
	}
}
