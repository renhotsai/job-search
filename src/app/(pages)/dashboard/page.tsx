import ResultTable from "@/app/components/result-table";
import SearchBoard from "@/app/components/search-board";
import { getUserJobsFromDB } from "@/lib/orm/query/user-jobs";

const Dashboard = async() => {

	const userJobs = await getUserJobsFromDB();

	return (
		<div className={'flex gap-5 w-full'}>
			<SearchBoard/>
			<ResultTable userJobs={userJobs}/>
		</div>
	);
}
export default Dashboard