'use server'
import { db } from "@/lib/orm/db";
import { userJobs } from "@/lib/orm/schema/user-jobs";
import { UserJobsEnums } from "@/lib/types/enums";
import { UserJobUpdateDto } from "@/lib/orm/dto/user-jobs";
import { UserJob } from "@/lib/types/user";
import { eq } from "drizzle-orm";

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


export const updateUserJobFromDB = async(job: UserJob, jobStatus:UserJobsEnums) =>{
	try{
		const updatedJob:UserJobUpdateDto = {id:job.id , status:jobStatus}
		const result =  await db.update(userJobs).set(updatedJob).where(eq(userJobs.id, job.id)).returning({updateDate:userJobs.updateDate})
		return result[0]
	}catch (error){
		console.error(error)
		throw error
	}
}