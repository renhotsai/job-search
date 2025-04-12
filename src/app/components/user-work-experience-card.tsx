import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { removeUserWorkExperienceFromDB } from "@/lib/orm/query/user-work-experience";
import { toast } from "sonner";
import { dbQueryStatus } from "@/lib/types/enums";
import { UserWorkExperience } from "@/lib/types/user";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
		<div className={'grid grid-cols-3 gap-5'}>
			{userWorkExperience.map((workExperience) => (
				<Dialog key={workExperience.id}>
					<DialogTrigger asChild>
						<Card
							className="relative space-y-8 rounded-lg shadow-md my-6">
							<button
								type="button"
								aria-label="Remove work experience"
								className="absolute top-4 right-4 text-xl hover:text-destructive transition-colors duration-150 ease-in-out focus:outline-none"
								onClick={() => {
									removeUserWorkExperience(workExperience.id).then()
								}}
							>
								&times;
							</button>

							<CardContent className="space-y-4">
								<CardTitle className="text-2xl font-bold break-words">{workExperience.company}</CardTitle>
								<p>{workExperience.jobTitle}</p>
								<CardDescription className="text-muted-foreground">
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
							</CardContent>
						</Card>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>{workExperience.company}</DialogTitle>
							<DialogDescription>
								{workExperience.startDate.toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
								})}{" "}
								–{" "}
								{workExperience.endDate.toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
								})}
							</DialogDescription>
						</DialogHeader>
						<p>{workExperience.jobTitle}</p>
						<p>{workExperience.jobDescription}</p>
						<DialogFooter className="sm:justify-start">
							<DialogClose asChild>
								<div className={'w-full justify-end flex'}>
									<Button type="button" variant="secondary">
										Close
									</Button>
								</div>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			))}
		</div>
	)
}

export default UserWorkExperienceCard
