import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserSavedJobsFromDB } from "@/lib/orm/query/user-jobs";
import { UserJobsEnums } from "@/lib/types/enums";
import DashboardCard from "@/app/components/dashboard-card";


const Dashboard = async () => {

	const userJobs = await getUserSavedJobsFromDB();
	const userJobsStatusEntities = Object.entries(UserJobsEnums)
		.filter(([key]) => isNaN(Number(key)))
		.filter(([key])=> key !== UserJobsEnums[UserJobsEnums.UNSAVED])

	return (
		<Tabs defaultValue={UserJobsEnums[UserJobsEnums.SAVED]} className="w-full">
			<TabsList>
				{userJobsStatusEntities.map(([key]) => (
						<TabsTrigger key={key} value={key}>{key}</TabsTrigger>
					))}
			</TabsList>
			{userJobsStatusEntities.map(([key, value]) => (
					<TabsContent key={key} value={key}>
						<DashboardCard
							status={UserJobsEnums[key as keyof typeof UserJobsEnums]}
							jobs={userJobs.filter(job => job.status === value)}
						/>
					</TabsContent>
				))}
		</Tabs>
	);
}
export default Dashboard