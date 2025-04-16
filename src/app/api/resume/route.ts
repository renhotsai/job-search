import { NextResponse } from "next/server"
import { db } from "@/lib/orm/db";
import { userJobs } from "@/lib/orm/schema/user-jobs";
import { eq } from "drizzle-orm";
import { userProfile } from "@/lib/orm/schema/user-profile";
import { createClient } from "@/lib/supabase/server";
import { createResume } from "@/lib/docx/resume";
import { getResume, uploadResume } from "@/lib/supabase/s3-bucket/resume";
import { updateUserJobFromDB } from "@/lib/orm/query/user-jobs";

export const POST = async (request: Request) => {
	try {
		const supabaseClient = await createClient();
		const {data: {user}} = await supabaseClient.auth.getUser();
		const data = await request.json()
		const jobId = data.jobId
		const userJobsFromDB = await db.select().from(userJobs).where(eq(userJobs.id, jobId));
		const userProfileWithRelations = await db.query.userProfile.findFirst({
			where: eq(userProfile.userId, user!.id),
			with: {
				educations: true,
				workExperiences: true
			}
		})

		const fileName = `${userJobsFromDB[0].userId}/${userJobsFromDB[0].companyName}_${userJobsFromDB[0].jobTitle}_resume.docx`
		if (!userJobsFromDB[0].resume) {
			// TODO: create resume
			const doc = createResume(userProfileWithRelations!);
			await uploadResume(doc, fileName)

			const jobToUpdate = {...userJobsFromDB[0], resume: true}
			updateUserJobFromDB(jobToUpdate).then(() => {
				console.log(`finished generateResume`)
			})
		}
		const resumeUrl = await getResume(fileName);

		return NextResponse.json({message: `success`, url: resumeUrl})
	} catch (error) {
		console.error(`error:${error}`)
		return NextResponse.json({message: error}, {status: 500})
	}
}