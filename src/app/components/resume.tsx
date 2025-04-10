import { db } from "@/lib/orm/db";
import { userProfile as userProfileSchema } from "@/lib/orm/schema/user-profile";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";


const Resume = async() => {
	const supabase = await createClient();
	const {data:{user}} = await supabase.auth.getUser();

	const userProfileFromDB =await db.select().from(userProfileSchema).where(eq(userProfileSchema.id, user!.id));
	const userProfile = userProfileFromDB[0];
	return (
		<div className={'border'}>
			<div className={'flex flex-col items-center'}>
				<div className={'flex flex-row'}>
					<h1>{userProfile.firstName}</h1>
					<h1>{userProfile.lastName}</h1>
				</div>
			<div>connect Info</div>
			</div>
		</div>
	);
};

export default Resume;