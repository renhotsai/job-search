'use client'

import UserWorkExperienceForm from "@/app/components/user-work-experience-form";
import UserWorkExperienceCard from "@/app/components/user-work-experience-card";
import { useState } from "react";
import { UserWorkExperience as UserWorkExperienceType } from "@/lib/types/user";

const UserWorkExperience = ({userWorkExperience}: { userWorkExperience: UserWorkExperienceType[] }) => {

	const [workExperience, setWorkExperience] = useState(userWorkExperience)
	return (
		<div>
			<UserWorkExperienceForm setUserWorkExperience={setWorkExperience}/>
			<UserWorkExperienceCard userWorkExperience={workExperience} setUserWorkExperience={setWorkExperience}/>
		</div>
	)
}

export default UserWorkExperience