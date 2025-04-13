'use client'
import UserEducationForm from "@/app/components/user-education-form";
import { UserEducationCard } from "@/app/components/user-education-card";
import { UserEducation as UserEducationType } from "@/lib/types/user";
import { useState } from "react";


const UserEducation = ({userEducations}: { userEducations: UserEducationType[] }) => {
	const [educations, setEducations] = useState(userEducations)
	return (
		<div>
			<UserEducationForm setUserEducations={setEducations}/>
			<UserEducationCard userEducations={educations} setUserEducations={setEducations}/>
		</div>
	)
}

export default UserEducation