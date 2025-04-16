import { NextResponse } from "next/server";
import { summaryJobDescriptionGPT } from "@/lib/openAI/openAI";


export const POST = async (request: Request) => {
	const data = await request.json()

	const result = await summaryJobDescriptionGPT(data.description)
	return new NextResponse(result!, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}