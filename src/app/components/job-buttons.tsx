'use client'

import { Button } from "@/components/ui/button";
import { UserJob } from "@/lib/types/user";

export const JobButtons = ({job}: { job: UserJob }) => {
	return (
		<div className={'flex gap-5'}>
			<Button
				onClick={() => {
					open(job.applyUrl!, '_blank')
				}}
			>Apply</Button>
			<Button>Resume</Button>
			<Button>Cover Letter</Button>
		</div>
	)
}
