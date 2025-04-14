import { db } from "@/lib/orm/db";
import { userJobs } from "@/lib/orm/schema/user-jobs";

export const getUserJobsFromDB = async () => {
	try {
		return await db.select().from(userJobs)
	} catch (error) {
		console.error(error)
		throw error
	}
}