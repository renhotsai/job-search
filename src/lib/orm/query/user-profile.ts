'use server'

import { db } from "@/lib/orm/db";
import { userProfile as userProfileDBSchema } from "@/lib/orm/schema/user-profile";
import { eq } from "drizzle-orm";

export const getUserProfileFromDB = async (userId: string) => {
	try {
		return db.select().from(userProfileDBSchema).where(eq(userProfileDBSchema.id, userId))
			.then(res => res[0] || null)
	} catch (error) {
		console.error(error)
		throw error
	}
}


