import { Dispatch, SetStateAction } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card"
import {  removeUserEducationFromDB } from "@/lib/orm/query/user-education";
import { toast } from "sonner";
import { dbQueryStatus } from "@/lib/types/enums";
import { UserEducation } from "@/lib/types/user";


type props = {
	userEducations: UserEducation[],
	setUserEducations: Dispatch<SetStateAction<UserEducation[]>>
}

export const UserEducationCard = ({userEducations, setUserEducations}: props) => {


	const removeUserEducation = async (id: number) => {
		const result = await removeUserEducationFromDB(id);
		setUserEducations((prevState) => prevState.filter((education) => education.id !== result.id))
		toast(dbQueryStatus.success, {
			description: `Education Removed`
		})
	}

	return (
		<div>
			{userEducations.map((education) => (
				<Card
					key={education.id}
					className="relative w-xl mx-auto p-6 space-y-8 rounded-lg shadow-md my-6 bg-background text-muted-foreground">
					{/* "×" button in top-right */}
					<button
						type="button"
						aria-label="Remove education"
						className="absolute top-4 right-4 text-xl hover:text-destructive transition-colors duration-150 ease-in-out focus:outline-none"
						onClick={() => {removeUserEducation(education.id).then()}}
					>
						&times;
					</button>

					<CardContent className="space-y-4">
						{/* Top row: School + Degree/Field */}
						<div className="grid grid-cols-2 justify-between items-start">
							<div>
								<CardTitle className="text-2xl font-bold">{education.school}</CardTitle>
								{/* Bottom row: Dates */}
								<CardDescription className="text-sm text-muted-foreground">
									{education.startDate.toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}{" "}
									–{" "}
									{education.endDate.toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}
								</CardDescription>
							</div>
							<div className="text-right justify-between">
								<p>{education.degree}</p>
								<p>{education.fieldOfStudy}</p>
							</div>
						</div>


					</CardContent>
				</Card>

			))}
		</div>
	)
}