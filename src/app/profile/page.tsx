import { createClient } from "@/lib/supabase/server";
import UserProfileForm from "@/app/components/user-profile-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const User = async () => {
	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();

	return (
		<div className={'flex p-20 flex-col'}>
			<UserProfileForm/>
		</div>
	)
}
export default User
