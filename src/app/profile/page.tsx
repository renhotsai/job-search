import UserProfileForm from "@/app/components/user-profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserEducationForm from "@/app/components/user-education-form";

const User = () => {

	return (
		<div className={'flex p-20 flex-col'}>


			<Tabs defaultValue="account" className="w-[400px]">
				<TabsList>
					<TabsTrigger value="account">Profile</TabsTrigger>
					<TabsTrigger value="password">Education</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<UserProfileForm/>
				</TabsContent>
				<TabsContent value="password">
					<UserEducationForm/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
export default User
