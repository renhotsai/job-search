import UserWorkExperienceForm from "@/app/components/user-work-experience-form";
import UserWorkExperienceCard from "@/app/components/user-work-experience-card";
import { Dispatch, SetStateAction } from "react";
import { UserWorkExperience as UserWorkExperienceType } from "@/lib/types/user";


type props = {
	userWorkExperience: UserWorkExperienceType[],
	setUserWorkExperience: Dispatch<SetStateAction<UserWorkExperienceType[]>>
}


const UserWorkExperience = ({userWorkExperience, setUserWorkExperience}: props)  => {
	return (
		<div>
			<UserWorkExperienceForm setUserWorkExperience={setUserWorkExperience}/>
			<UserWorkExperienceCard userWorkExperience={userWorkExperience} setUserWorkExperience={setUserWorkExperience}/>
		</div>
	)
}

export default UserWorkExperience