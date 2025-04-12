import { Dispatch, SetStateAction } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card"
import { removeUserEducationFromDB } from "@/lib/orm/query/user-education";
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
		<div className={'grid grid-cols-3 gap-5'}>
			{userEducations.map((education) => (
				<Card
					key={education.id}
					className="relative space-y-8 rounded-lg shadow-md my-6">
					{/* "×" button in top-right */}
					<button
						type="button"
						aria-label="Remove education"
						className="absolute top-4 right-4 text-xl hover:text-destructive transition-colors duration-150 ease-in-out focus:outline-none"
						onClick={() => {
							removeUserEducation(education.id).then()
						}}
					>
						&times;
					</button>
					<CardContent className="space-y-4">
						<CardTitle className="text-2xl font-bold break-words">{education.school}</CardTitle>
						{education.fieldOfStudy}
						<CardDescription>{education.degree}</CardDescription>
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
					</CardContent>
				</Card>

			))}
		</div>
	)
}