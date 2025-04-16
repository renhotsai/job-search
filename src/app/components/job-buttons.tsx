import { Button } from "@/components/ui/button";
import { UserJob } from "@/lib/types/user";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserJobsEnums } from "@/lib/types/enums";
import { updateUserJobFromDB } from "@/lib/orm/query/user-jobs";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const JobButtons = ({job}: { job: UserJob }) => {
	const router = useRouter();
	const [isResumePending, startResumeTransition] = useTransition()
	const [isCoverLetterPending, startCoverLetterTransition] = useTransition()

	const resume = () => {

		startResumeTransition(async () => {
			console.log(`generateResume`)
			const result = await fetch('/api/resume', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({jobId: job.id}),
			})

			if (!result.ok) {
				toast.error("Error generating resume")
				throw new Error("Error generating resume")
			}
			const { url } = await result.json();
			open(url, '_blank')
		})
	}

	const coverLetter = () => {
		startCoverLetterTransition(async () => {
			if (job.coverLetter) {
				console.log(`cover letter already generated`)
			} else {
				console.log(`generateCoverLetter`)
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve(true)
					}, 5000)
				})

				//update user_job
				const jobToUpdate = {...job, coverLetter: true}
				updateUserJobFromDB(jobToUpdate).then(() => {
					console.log(`finished generateCoverLetter`)
				})
			}
		})
	}

	const applyJob = () => {
		const jobToUpdate = {...job, status: UserJobsEnums.APPLIED}
		updateUserJobFromDB(jobToUpdate).then(() => {
			router.refresh();
		})
		open(job.applyUrl!, '_blank')
	}

	const interviewing = () => {

		const jobToUpdate = {...job, status: UserJobsEnums.INTERVIEWING}
		updateUserJobFromDB(jobToUpdate).then(() => {
			router.refresh();
		})
	}

	const reject = () => {
		const jobToUpdate = {...job, status: UserJobsEnums.REJECTED}
		updateUserJobFromDB(jobToUpdate).then(() => {
			router.refresh();
		})
	}

	const offered = () => {
		const jobToUpdate = {...job, status: UserJobsEnums.OFFERED}
		updateUserJobFromDB(jobToUpdate).then(() => {
			router.refresh();
		})
	}

	const ResumeCoverLetter = () => (
		<div className="flex gap-5 w-full">
			<div className="flex-1">
				<Button onClick={resume} className="w-full" disabled={isResumePending}>Resume</Button>
			</div>
			<div className="flex-1">
				<Button onClick={coverLetter} className="w-full" disabled={isCoverLetterPending}>Cover Letter</Button>
			</div>
		</div>
	)

	if (job.status === UserJobsEnums.SAVED) {
		return (
			<div className="flex flex-col gap-5 w-full">
				<ResumeCoverLetter/>
				<div className="flex gap-5 w-full">
					<Button onClick={applyJob} className="w-full">Apply</Button>
				</div>
			</div>

		)
	}

	if (job.status === UserJobsEnums.APPLIED) {
		return (
			<div className="flex flex-col gap-5 w-full">
				<ResumeCoverLetter/>
				<div className="flex gap-5 w-full">
					<div className="flex-1">
						<Button onClick={interviewing} className="w-full">Interviewing</Button>
					</div>
					<div className="flex-1">
						<Button onClick={reject} className="w-full">Reject</Button>
					</div>
				</div>
			</div>
		)
	}

	if (job.status === UserJobsEnums.INTERVIEWING) {
		return (
			<div className="flex gap-5 w-full">
				<div className="w-full">
					<Button onClick={offered} className="w-full">Offered</Button>
				</div>
				<div className="w-full">
					<Button onClick={reject} className="w-full">Reject</Button>
				</div>
			</div>
		)
	}
}