import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { removeUserWorkExperienceFromDB } from "@/lib/orm/query/user-work-experience";
import { toast } from "sonner";
import { dbQueryStatus } from "@/lib/types/enums";
import { UserWorkExperience } from "@/lib/types/user";

type props = {
	userWorkExperience: UserWorkExperience[],
	setUserWorkExperience: Dispatch<SetStateAction<UserWorkExperience[]>>
}

const UserWorkExperienceCard = ({userWorkExperience, setUserWorkExperience}: props) => {


	const removeUserWorkExperience = async (id: number) => {
		try {
			const result = await removeUserWorkExperienceFromDB(id);
			setUserWorkExperience((prevState) => prevState.filter((workExperience) => workExperience.id !== result.id))
			toast(dbQueryStatus.success, {
				description: `Work Experience Removed`
			})
		} catch (error) {
			toast(dbQueryStatus.fail, {
				description: `Work Experience Removed Failed`
			})
		}
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
							removeUserWorkExperience(workExperience.id).then()
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
