import UserWorkExperienceForm from "@/app/components/user-work-experience-form";
import UserWorkExperienceCard from "@/app/components/user-work-experience-card";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getUserWorkExperienceFromDB } from "@/lib/orm/query/user-work-experience";
import { UserWorkExperience as UserWorkExperienceType } from "@/lib/types/user";


const UserWorkExperience = () => {

	const [userWorkExperience, setUserWorkExperience] = useState<UserWorkExperienceType[]>([])
	useEffect(() => {
		const getUserEducation = async () => {
			const supabase = createClient();
			const {data: {user}} = await supabase.auth.getUser();
			const userEducationFromDB = await getUserWorkExperienceFromDB(user!.id);
			setUserWorkExperience(userEducationFromDB)
		}
		getUserEducation().then()
	}, []);
	return (
		<div>
			<UserWorkExperienceForm userWorkExperience={userWorkExperience} setUserWorkExperience={setUserWorkExperience}/>
			<UserWorkExperienceCard userWorkExperience={userWorkExperience} setUserWorkExperience={setUserWorkExperience}/>
		</div>
	)
}

export default UserWorkExperience