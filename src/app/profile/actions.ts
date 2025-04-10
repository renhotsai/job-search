'use server'

import { profileSchema } from "@/app/profile/schema";
import { z } from "zod";
import { db } from "@/lib/orm/db";
import { userProfile } from "@/lib/orm/schema/user-profile";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const saveProfile = async (value: z.infer<typeof profileSchema>) => {
	console.log(`value: ${JSON.stringify(value)}`)
	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();
	const userProfileToInsert = {id: user!.id, ...value};
	try {
			await db.insert(userProfile).values(userProfileToInsert)
				.onConflictDoUpdate({
				target: userProfile.id,
				set: userProfileToInsert,
			});
		return "success"
	} catch (error) {
		console.error(error)
		return error
	}
}

export { saveProfile }
