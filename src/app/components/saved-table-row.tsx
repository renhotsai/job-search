import { TableCell, TableRow } from "@/components/ui/table";
import { UserJob } from "@/lib/types/user";
import { JobButtons } from "@/app/components/job-buttons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/ui/components/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserJobBadge } from "@/app/components/user-job-badge";


export const SavedTableRow = ({job}: { job: UserJob }) => {
	return (
		<Dialog>
			<TableRow>
				<TableCell className={'break-words whitespace-normal'}>
					<DialogTrigger className={'text-left w-full'}>
						{job.companyName}
					</DialogTrigger>
				</TableCell>
				<TableCell className={'break-words whitespace-normal'}>
					<DialogTrigger className={'text-left w-full'}>
						{job.jobTitle}
					</DialogTrigger>
				</TableCell>
				<TableCell className={'break-words whitespace-normal'}>
					<DialogTrigger className={'text-left w-full'}>
						{job.location}
					</DialogTrigger>
				</TableCell>
				<TableCell>
					<DialogTrigger className={'text-left w-full'}>
						<UserJobBadge job={job} />
					</DialogTrigger>
				</TableCell>
				<DialogContent className={'h-2/3'}>
					<DialogHeader>
						<DialogTitle>{job.companyName} - {job.jobTitle}</DialogTitle>
						<DialogDescription>
							{job.salaryRange}
						</DialogDescription>
						<DialogDescription>
							{job.location}
						</DialogDescription>
					</DialogHeader>
					<DialogBody className={'flex flex-col h-full overflow-hidden gap-5'}>
						<div className={'flex flex-col h-full overflow-hidden gap-2'}>
							<Label className={'text-2xl text-muted-foreground'}>
								Job Description
							</Label>
							<Separator/>
							<ScrollArea className={'h-9/12'}>
								{job.jobDescription}
							</ScrollArea>
						</div>
					</DialogBody>
					<DialogFooter>
						<JobButtons job={job}/>
					</DialogFooter>
				</DialogContent>
			</TableRow>
		</Dialog>
	)
}