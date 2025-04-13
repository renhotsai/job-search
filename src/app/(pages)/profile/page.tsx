import { createClient } from "@/lib/supabase/server";
import { getUserEducationFromDB } from "@/lib/orm/query/user-education";
import { getUserWorkExperienceFromDB } from "@/lib/orm/query/user-work-experience";
import { getUserProfileFromDB } from "@/lib/orm/query/user-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileForm from "@/app/components/user-profile-form";
import UserEducation from "@/app/components/user-education";
import UserWorkExperience from "@/app/components/user-work-experience";


const Profile = async () => {

	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();
	const userEducationFromDB = await getUserEducationFromDB(user!.id);
	const userWorkExperience = await getUserWorkExperienceFromDB(user!.id);
	const userProfileFromDB = await getUserProfileFromDB(user!.id);

	return (
		<div className={'flex flex-col gap-5'}>
			<h2 className="text-4xl font-bold "> Information</h2>
			<Tabs defaultValue="profile" className="">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="education">Education</TabsTrigger>
					<TabsTrigger value="workExperience">Work Experience</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<UserProfileForm userProfile={userProfileFromDB}/>
				</TabsContent>
				<TabsContent value="education">
					<UserEducation userEducations={userEducationFromDB}/>
				</TabsContent>
				<TabsContent value="workExperience">
					<UserWorkExperience userWorkExperience={userWorkExperience} />
				</TabsContent>
			</Tabs>
		</div>

	)
}

export default Profile