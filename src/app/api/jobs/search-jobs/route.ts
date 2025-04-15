import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { searchJobsFromApify } from "@/lib/apify/apify";
import { JobSearchParams } from "@/lib/types/apify";



export const POST = async (request: Request) => {
	try {
		const supabaseClient = await createClient();
		const {data: {user}}=await supabaseClient.auth.getUser();

		const data = await request.json() as JobSearchParams
		const { experienceLevel, jobType, workSchedule, ...rest } = data
		const searchData: Partial<JobSearchParams> = {
			...rest,
			...(experienceLevel !== "0" && { experienceLevel }),
			...(jobType !== "A" && { jobType }),
			...(workSchedule !== "0" && { workSchedule }),
		}

		const items = await searchJobsFromApify(searchData)
		const itemsWithUserId = items.map((item) => ({...item,user_id:user?.id}))

		const {error} = await supabaseClient
			.from('user_jobs')
			.insert(itemsWithUserId)
		if (error) {
			throw new Error(error.message)
		}
		return NextResponse.json({message:"success",items:items.length})
	} catch (error) {
		return NextResponse.json({message:`${error}`}, {status: 500})
	}
}