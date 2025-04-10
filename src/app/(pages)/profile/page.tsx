import UserProfileForm from "@/app/components/user-profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserEducationForm from "@/app/components/user-education-form";
import Resume from "@/app/components/resume";

const User = () => {

	return (
		<div className={'h-full p-14 grid grid-cols-2'}>
			<Tabs defaultValue="profile" className="w-[400px]">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="education">Education</TabsTrigger>
					<TabsTrigger value="workExperience">Work Experience</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<UserProfileForm/>
				</TabsContent>
				<TabsContent value="education">
					<UserEducationForm/>
				</TabsContent>
				<TabsContent value="workExperience">
					<UserEducationForm/>
				</TabsContent>
			</Tabs>

			<Resume/>
		</div>
	)
}
export default User
