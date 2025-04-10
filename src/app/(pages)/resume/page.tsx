'use client'

import UserProfileForm from "@/app/components/user-profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserEducationForm from "@/app/components/user-education-form";
import ResumeView from "@/app/components/resume-view";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, UserProfile } from "@/lib/orm/dto/user-profile";


const Resume = () => {

	const form = useForm<UserProfile>({
		resolver: zodResolver(profileSchema),
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
	const { control } = form

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
					<UserEducationForm/>
				</TabsContent>
				<TabsContent value="workExperience">
					<UserEducationForm/>
				</TabsContent>
			</Tabs>

			<ResumeView control={control}/>
		</div>
	)
}
export default Resume
