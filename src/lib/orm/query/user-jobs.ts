'use server'
import { db } from "@/lib/orm/db";
import { userJobs } from "@/lib/orm/schema/user-jobs";
import { UserJobsEnums } from "@/lib/types/enums";
import { UserJob } from "@/lib/types/user";
import { eq, not } from "drizzle-orm";

export const getUserJobsFromDB = async () => {
	try {
		const results = await db.select().from(userJobs).orderBy(userJobs.id)
		return results.map(result => ({
			...result,
			status: result.status as UserJobsEnums,
		}));

	} catch (error) {
		console.error(error)
		throw error
	}
}

export const getUserSavedJobsFromDB = async () => {
	try {
		const results = await db.select().from(userJobs).where(not(eq(userJobs.status, UserJobsEnums.UNSAVED))).orderBy(userJobs.id)
		return results.map(result => ({
			...result,
			status: result.status as UserJobsEnums,
		}));
	} catch (error) {
		console.error(error)
		throw error
	}
}


export const updateUserJobFromDB = async (jobToUpdate: UserJob) => {
	try {
			const result = await db.update(userJobs).set(jobToUpdate).where(eq(userJobs.id, jobToUpdate.id)).returning({updateDate: userJobs.updateDate})
			return result[0]
	} catch (error) {
		console.error(error)
		throw error
	}
}