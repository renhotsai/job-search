import OpenAI from 'openai';

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export const summaryJobDescriptionGPT = async (jobDescription: string) => {
	const response = await client.chat.completions.create({
		model: 'gpt-4.1-mini',
		messages: [
			{
				role: 'system',
				content: 'You are a helpful jobSearch assistant.',
			},
			{
				role: 'user',
				content: `Summarize the following job description in a few sentences: ${jobDescription}`,
			}
		],
	});
	return response.choices[0].message.content;
}