'use client'

import UserProfileForm from "@/app/components/user-profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSchema, UserProfileType } from "@/app/schema/user-profile-type";
import { UserEducation } from "@/app/components/user-education";
import UserWorkExperience from "@/app/components/user-work-experience";
import { useEffect, useState } from "react";
import { UserEducation as UserEducationType,  UserWorkExperience as UserWorkExperienceType } from "@/lib/types/user";
import { createClient } from "@/lib/supabase/client";
import { getUserEducationFromDB } from "@/lib/orm/query/user-education";
import { getUserWorkExperienceFromDB } from "@/lib/orm/query/user-work-experience";


const Resume = () => {

	const form = useForm<UserProfileType>({
		resolver: zodResolver(UserProfileSchema),
		defaultValues: {
			lastName: "",
			firstName: "",
			email: "",
			bio: "",
			phone: "",
			linkedin: "",
			github: "",
			skills: [],
		},
	})

	const [userEducations, setUserEducations] = useState<UserEducationType[]>([])
	useEffect(() => {
		const getUserEducation = async () => {
			const supabase = createClient();
			const {data: {user}} = await supabase.auth.getUser();
			const userEducationFromDB = await getUserEducationFromDB(user!.id);
			setUserEducations(userEducationFromDB)
		}
		getUserEducation().then()
	}, []);

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
		<div className={'h-full p-14 grid grid-cols-2'}>
			<Tabs defaultValue="profile" className="w-[400px]">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="education">Education</TabsTrigger>
					<TabsTrigger value="workExperience">Work Experience</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<UserProfileForm form={form}/>
				</TabsContent>
				<TabsContent value="education">
					<UserEducation userEducations={userEducations} setUserEducations={setUserEducations}/>
				</TabsContent>
				<TabsContent value="workExperience">
					<UserWorkExperience userWorkExperience={userWorkExperience} setUserWorkExperience={setUserWorkExperience}/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
export default Resume
