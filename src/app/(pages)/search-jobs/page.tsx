import { getUserJobsFromDB } from "@/lib/orm/query/user-jobs";
import SearchBoard from "@/app/components/search-board";
import ResultTable from "@/app/components/result-table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserJobsEnums } from "@/lib/types/enums";

const SearchJobs = async () => {

	const userJobs = await getUserJobsFromDB();

	return (
		<div className={'flex gap-5 w-full'}>
			<SearchBoard/>
			<Card className={'w-full'}>
				<CardHeader>
					<CardTitle className={"text-2xl"}>Jobs</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				{userJobs.length > 0 ? <div>
						<ResultTable userJobs={userJobs}/>
					</div>
					: <div className={'flex h-full justify-center items-center'}>
						<CardTitle className={'text-2xl'}>Search Jobs</CardTitle>
					</div>}
			</Card>
		</div>
	);
}

export default SearchJobs