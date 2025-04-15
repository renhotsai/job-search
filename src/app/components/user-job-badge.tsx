import { Badge } from "@/components/ui/badge";
import { UserJob } from "@/lib/types/user";
import { UserJobsEnums } from "@/lib/types/enums";


type UserJobBadgeProps = {
	job:UserJob
}
export const UserJobBadge = ({job}:UserJobBadgeProps) =>{
	return (
		<div className="flex items-center gap-2">
			<Badge variant="default">{UserJobsEnums[job.status]}</Badge>
			{job.resume && <Badge variant='destructive'>Resume</Badge>}
			{job.coverLetter && <Badge variant='destructive'>Cover Letter</Badge>}
		</div>
	)
}