'use server'

import { profileSchema } from "@/app/(pages)/resume/schema";
import { z } from "zod";
import { db } from "@/lib/orm/db";
import { userProfile } from "@/lib/orm/schema/user-profile";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { dbQueryStatus } from "@/lib/types/enums";

const saveProfile = async (prevState: any, value: z.infer<typeof profileSchema>) => {
	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();
	const userProfileToInsert = {id: user!.id, ...value};

	try {
		await db.insert(userProfile).values(userProfileToInsert)
		.onConflictDoUpdate({
			target: userProfile.id,
			set: userProfileToInsert,
		});
		const result = await db.select().from(userProfile).where(eq(userProfile.id, user!.id))

		return {
			status:dbQueryStatus.success,
			message: result[0].updateDate!.toUTCString()
		}
	} catch (error) {
		console.error(`Error: ${error}`)
		return {
			status:dbQueryStatus.fail,
			message: `Error saving profile`
		}
	}
}

export { saveProfile }
