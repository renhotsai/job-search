import { Dispatch, SetStateAction } from "react";
import { UserEducationDto } from "@/lib/orm/dto/user-educatoin";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card"
import { getUserEducationFromDB, removeUserEducationFromDB } from "@/lib/orm/query/user-education";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { dbQueryStatus } from "@/lib/types/enums";


type props = {
	userEducations: UserEducationDto[],
	setUserEducations: Dispatch<SetStateAction<UserEducationDto[]>>
}

export const UserEducationCard = ({userEducations, setUserEducations}: props) => {


	const removeUserEducation = async (id: number) => {
		const supabase = createClient();
		const {data: {user}} = await supabase.auth.getUser();
		const userId = user!.id
		await removeUserEducationFromDB(id);
		getUserEducationFromDB(userId).then((userEducationFromDB) => {
			setUserEducations(() => [...userEducationFromDB]);
		});

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