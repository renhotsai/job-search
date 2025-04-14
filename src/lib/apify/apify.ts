import { ApifyClient } from "apify-client";
import { JobSearchParams } from "@/lib/types/apify";
import { convertKeysToSnake } from "@/lib/utils";

const client = new ApifyClient({
	token: process.env.APIFY_API_TOKEN,
});


export const searchJobsFromApify = async (data: JobSearchParams) => {

	const snakeData =convertKeysToSnake(data)
	const run = await client.actor("JkfTWxtpgfvcRQn3p").call(snakeData);

	// Fetch and print Actor results from the run's dataset (if any)
	const {items} = await client.dataset(run.defaultDatasetId).listItems();
	return items
}