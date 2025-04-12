import UserEducationForm from "@/app/components/user-education-form";
import { Dispatch, SetStateAction } from "react";
import { UserEducationCard } from "@/app/components/user-education-card";
import { UserEducation as UserEducationType } from "@/lib/types/user";

type props = {
	userEducations: UserEducationType[],
	setUserEducations: Dispatch<SetStateAction<UserEducationType[]>>
}

export const UserEducation = ({userEducations, setUserEducations}: props) => {
	return (
		<div>
			<UserEducationForm setUserEducations={setUserEducations}/>
			<UserEducationCard userEducations={userEducations} setUserEducations={setUserEducations}/>
		</div>
	)
}