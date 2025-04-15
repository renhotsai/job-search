import { getUserJobsFromDB } from "@/lib/orm/query/user-jobs";
import SearchBoard from "@/app/components/search-board";
import ResultTable from "@/app/components/result-table";

const SearchJobs = async() => {

	const userJobs = await getUserJobsFromDB();

	return (
		<div className={'flex gap-5 w-full'}>
			<SearchBoard/>
			<ResultTable userJobs={userJobs}/>
		</div>
	);
}

export default SearchJobs