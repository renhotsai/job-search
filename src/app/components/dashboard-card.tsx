import { UserJob } from "@/lib/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResultTable from "@/app/components/result-table";
import { UserJobsEnums } from "@/lib/types/enums";


type DashboardCardProps = {
	jobs: UserJob[],
	status:UserJobsEnums
}

const DashboardCard = ({jobs, status}: DashboardCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{UserJobsEnums[status]}</CardTitle>
			</CardHeader>
			<CardContent>
				<ResultTable jobStatus={status} userJobs={jobs}/>
			</CardContent>
		</Card>
	)
}

export default DashboardCard