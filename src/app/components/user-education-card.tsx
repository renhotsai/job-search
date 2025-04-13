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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Dialog, DialogClose, DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


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
		<ScrollArea className="h-svh w-full rounded-md border p-2 ">
			<div className={'grid grid-cols-3 gap-5'}>
				{userEducations.map((education) => (
					<Dialog key={education.id}>
						<DialogTrigger>
							<Card className="relative space-y-8 rounded-lg shadow-md my-6">
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
						</DialogTrigger>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>{education.school}</DialogTitle>
								<DialogDescription>
									{education.startDate.toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}{" "}
									–{" "}
									{education.endDate.toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}
								</DialogDescription>
							</DialogHeader>
							<p>{education.degree}</p>
							<p>{education.fieldOfStudy}</p>
							<DialogFooter className="sm:justify-start">
								<DialogClose asChild>
									<div className={'w-full justify-end flex'}>
										<Button type="button" variant="secondary" onClick={() => removeUserEducation(education.id)}>
											Remove
										</Button>
									</div>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				))}
			</div>
		</ScrollArea>
	)
}