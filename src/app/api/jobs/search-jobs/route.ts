import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { ApifyClient } from 'apify-client';

export const POST = async (request: Request) => {
	try {
		const supabaseClient = await createClient();

		const {data: {session}} = await supabaseClient.auth.getSession();
		const {data: {user}}=await supabaseClient.auth.getUser();
		if (!session) {
			return new Response(null, {status: 401})
		}

		if (!process.env.JOBSEARCH_URL) {
			return new Response(null, {status: 500})
		}


		const data = await request.json()

		function toSnakeCase(str: string) {
			return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
		}

		function convertKeysToSnake<T extends Record<string, string>>(obj: T): Record<string, string> {
			return Object.fromEntries(
				Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value])
			);
		}

		const snakeData =convertKeysToSnake(data)


		console.log("data:", snakeData)

		const client = new ApifyClient({
			token: process.env.APIFY_API_TOKEN,
		});

		const run = await client.actor("JkfTWxtpgfvcRQn3p").call(data);

		// Fetch and print Actor results from the run's dataset (if any)
		console.log('Results from dataset');
		const {items} = await client.dataset(run.defaultDatasetId).listItems();

		const itemsWithUserId = items.map((item) => ({...item,user_id:user?.id}))

		const {error} = await supabaseClient
			.from('user_jobs')
			.insert(itemsWithUserId)

		console.log(`data:${JSON.stringify(data)}`)
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