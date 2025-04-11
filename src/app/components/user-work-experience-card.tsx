import { Dispatch, SetStateAction } from "react"
import { UserWorkExperience } from "@/lib/orm/dto/user-work-experience";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { getUserWorkExperienceFromDB, removeUserWorkExperienceFromDB } from "@/lib/orm/query/user-work-experience";
import { toast } from "sonner";
import { dbQueryStatus } from "@/lib/types/enums";

type props = {
	userWorkExperience: UserWorkExperience[],
	setUserWorkExperience: Dispatch<SetStateAction<UserWorkExperience[]>>
}

const UserWorkExperienceCard = ({userWorkExperience, setUserWorkExperience}: props) => {


	const removeUserEducation = async (id: number) => {
		const supabase = createClient();
		const {data: {user}} = await supabase.auth.getUser();
		const userId = user!.id
		await removeUserWorkExperienceFromDB(id);
		getUserWorkExperienceFromDB(userId).then((userEducationFromDB) => {
			setUserWorkExperience(() => [...userEducationFromDB]);
		});

		toast(dbQueryStatus.success, {
			description: `Education Removed`
		})
	}

	return (
		<div>
			{userWorkExperience.map((workExperience) => (
				<Card
					key={workExperience.id}
					className="relative w-xl mx-auto p-6 space-y-8 rounded-lg shadow-md my-6 bg-background text-muted-foreground">
					{/* "×" button in top-right */}
					<button
						type="button"
						aria-label="Remove education"
						className="absolute top-4 right-4 text-xl hover:text-destructive transition-colors duration-150 ease-in-out focus:outline-none"
						onClick={() => {
							removeUserEducation(workExperience.id).then()
						}}
					>
						&times;
					</button>

					<CardContent className="space-y-4">
						{/* Top row: School + Degree/Field */}
						<div className="grid grid-cols-2 justify-between items-start">
							<div>
								<CardTitle className="text-2xl font-bold">{workExperience.company}</CardTitle>
								{/* Bottom row: Dates */}
								<CardDescription className="text-sm text-muted-foreground">
									{workExperience.startDate.toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}{" "}
									–{" "}
									{workExperience.endDate.toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}
								</CardDescription>
							</div>
							<div className="text-right justify-between">
								<p>{workExperience.jobTitle}</p>
								<p>{workExperience.jobDescription}</p>
							</div>
						</div>


					</CardContent>
				</Card>

			))}
		</div>
	)
}

export default UserWorkExperienceCard
