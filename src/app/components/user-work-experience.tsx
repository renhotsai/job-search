import UserWorkExperienceForm from "@/app/components/user-work-experience-form";
import UserWorkExperienceCard from "@/app/components/user-work-experience-card";
import { useEffect, useState } from "react";
import { UserWorkExperience as UserWorkExperienceType } from "@/lib/orm/dto/user-work-experience";
import { createClient } from "@/lib/supabase/client";
import { getUserWorkExperienceFromDB } from "@/lib/orm/query/user-work-experience";


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
			<UserWorkExperienceForm setUserWorkExperience={setUserWorkExperience}/>
			<UserWorkExperienceCard userWorkExperience={userWorkExperience} setUserWorkExperience={setUserWorkExperience}/>
		</div>
	)
}

export default UserWorkExperience