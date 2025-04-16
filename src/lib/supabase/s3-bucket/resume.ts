import { createClient } from "@/lib/supabase/server";
import { Document, Packer } from "docx";



export const getResume = async (fileName: string) => {
	const supabase = await createClient();
	const { data , error } = await supabase.storage
		.from("resume").createSignedUrl(fileName, 60);

	if (error) {
		throw new Error(error.message);
	}
	return data?.signedUrl;
}

export const uploadResume = async (doc: Document, fileName: string) => {
		const supabase = await createClient();
		// Convert Document to Blob
		const buffer = await Packer.toBlob(doc);
		const {data, error} = await supabase.storage
			.from("resume") // Might want to change the bucket name from "avatars" to "resumes"?
			.upload(fileName, buffer, {
				contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			});

		if (error) {
			throw new Error(error.message);
		}
		return data;
};
