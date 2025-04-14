import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {


	const supabaseClient = await createClient();

	const {data: {session}} = await supabaseClient.auth.getSession();

	if (!session) {
		return new Response(null, {status: 401})
	}

	if (!process.env.JOBSEARCH_URL) {
		return new Response(null, {status: 500})
	}

	const data = await request.json()
	console.log('data:',data)
	return NextResponse.json([])
}