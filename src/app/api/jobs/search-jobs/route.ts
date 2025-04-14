import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { searchJobsFromApify } from "@/lib/apify/apify";
import { JobSearchParams } from "@/lib/types/apify";



export const POST = async (request: Request) => {
	try {
		const supabaseClient = await createClient();
		const {data: {user}}=await supabaseClient.auth.getUser();

		const data = await request.json() as JobSearchParams

		const items = await searchJobsFromApify(data)
		const itemsWithUserId = items.map((item) => ({...item,user_id:user?.id}))

		const {error} = await supabaseClient
			.from('user_jobs')
			.insert(itemsWithUserId)
		if (error) {
			console.error(error)
			return new NextResponse(`error: ${error}`, {status: 500})
		}

		return NextResponse.json({status:"success",items:items.length})
	} catch (error) {
		console.error(error)
		return NextResponse.json({status:"error"})
	}
}