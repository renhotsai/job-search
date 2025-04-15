import { TableCell, TableRow } from "@/components/ui/table";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { dbQueryStatus, UserJobsEnums } from "@/lib/types/enums";
import { UserJob } from "@/lib/types/user";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserJobFromDB } from "@/lib/orm/query/user-jobs";
import { Separator } from "@/components/ui/separator";

export const ResultTableRow = ({job}: { job: UserJob }) => {

	const [isPending, startTransition] = useTransition()
	const [summary, setSummary] = useState<string | null>(null)
	const router = useRouter();

	const keepJob = (job: UserJob) => {
		startTransition(async () => {
			try {
				const result = await updateUserJobFromDB(job, UserJobsEnums.SAVED)
				toast(dbQueryStatus.success, {
					description: `Job Saved on ${result.updateDate}`
				})
				router.refresh();
			} catch (error) {
				console.error(error)
				toast(dbQueryStatus.fail)
			}
		});
	};

	const summaryJobDescription = async (description: string) => {
		const result = await fetch('api/jobs/summary-job-description', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({description}),
		})
		setSummary(await result.text())
	};

	return (
		<Dialog>
			<TableRow>
				<TableCell className={'break-words whitespace-normal'}>
					<DialogTrigger className={'text-left'}>
						{job.companyName}
					</DialogTrigger>
				</TableCell>
				<TableCell className={'break-words whitespace-normal'}>
					<DialogTrigger className={'text-left'}>
						{job.jobTitle}
					</DialogTrigger>
				</TableCell>
				<TableCell className={'break-words whitespace-normal'}>
					<DialogTrigger className={'text-left'}>
						{job.location}
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
						{summary &&
                <div className={'flex flex-col h-full overflow-hidden gap-2'}>
                    <Label className={'text-2xl text-muted-foreground'}>
                        Job Summary
                    </Label>
                    <Separator/>
                    <ScrollArea className={'h-9/12'}>
											{summary}
                    </ScrollArea>
                </div>
						}
					</DialogBody>
					<DialogFooter>
						{!summary &&
                <Button onClick={() => summaryJobDescription(job.jobDescription!)}>Summary</Button>
						}
						{job.status === UserJobsEnums.UNSAVED &&
                <Button onClick={() => keepJob(job)} disabled={isPending}>Keep This Job</Button>
						}
					</DialogFooter>
				</DialogContent>
			</TableRow>
		</Dialog>
	)
}