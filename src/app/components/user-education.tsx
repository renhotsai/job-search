import UserEducationForm from "@/app/components/user-education-form";
import { useEffect, useState } from "react";
import { UserEducationDto } from "@/lib/orm/dto/user-educatoin";
import { getUserEducationFromDB } from "@/lib/orm/query/user-education";
import { createClient } from "@/lib/supabase/client";
import { UserEducationCard } from "@/app/components/user-education-card";


export const UserEducation = () => {

	const [userEducations, setUserEducations] = useState<UserEducationDto[]>([])
	useEffect(() => {
		const getUserEducation = async () => {
			const supabaase = createClient();
			const {data: {user}} = await supabaase.auth.getUser();
			 const userEducationFromDB = await getUserEducationFromDB(user!.id);
			setUserEducations(userEducationFromDB)
		}
		getUserEducation()
	}, []);
	return (
		<div>
			<UserEducationForm setUserEducations={setUserEducations}/>
			<UserEducationCard userEducations={userEducations} setUserEducations={setUserEducations}/>
		</div>
	)
}