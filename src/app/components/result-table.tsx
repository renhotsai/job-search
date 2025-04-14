'use client'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { UserJob } from "@/lib/types/user";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import {
	Dialog,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState, useTransition } from "react";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/ui/components/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { updateUserJobFromDB } from "@/lib/orm/query/user-jobs";
import { dbQueryStatus, UserJobsEnums } from "@/lib/types/enums";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10; // Number of jobs per page


const ResultTable = ({userJobs}: { userJobs: UserJob[] }) => {

	const [currentPage, setCurrentPage] = useState(1);
	const [paginatedJobs, setPaginatedJobs] = useState<UserJob[]>([])
	const [totalPages, setTotalPages] = useState(0);
	const router = useRouter();

	useEffect(() => {
		const pages = Math.ceil(userJobs.length / PAGE_SIZE);
		setTotalPages(pages)
	}, [userJobs])


	useEffect(() => {
		const jobs = userJobs.slice(
			(currentPage - 1) * PAGE_SIZE,
			currentPage * PAGE_SIZE
		);
		setPaginatedJobs(jobs)
	}, [userJobs, currentPage])


	// Handlers for page navigation
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};


	const keepJob = (job: UserJob) => {
		startTransition(async () => {
			try{
				const result = await updateUserJobFromDB(job,UserJobsEnums.SAVED)
				toast(dbQueryStatus.success,{
					description: `Job Saved on ${result.updateDate}`})
				router.refresh();
			}
			catch (error){
				console.error(error)
				toast(dbQueryStatus.fail)
			}
		});
	};

	const [isPending, startTransition] = useTransition()


	return (
		<Card className={'w-full'}>
			<CardHeader>
				<CardTitle className={"text-2xl"}>Jobs</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<Table className="w-full table-fixed">
				<TableHeader className={'sticky top-0 bg-card'}>
					<TableRow>
						<TableHead className="w-1/3">Company</TableHead>
						<TableHead className="w-1/3">Job Title</TableHead>
						<TableHead className="w-1/3">Location</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedJobs.map((job) => (
						<Dialog key={job.jobId}>
							<TableRow key={job.jobId}>
								<TableCell className={'break-words whitespace-normal'}>
									<DialogTrigger>
										{job.companyName}
									</DialogTrigger>
								</TableCell>
								<TableCell className={'break-words whitespace-normal'}>
									<DialogTrigger>
										{job.jobTitle}
									</DialogTrigger>
								</TableCell>
								<TableCell className={'break-words whitespace-normal'}>
									<DialogTrigger>
										{job.location}
									</DialogTrigger>
								</TableCell>
								<DialogContent className={'h-1/2'}>
									<DialogHeader>
										<DialogTitle>{job.companyName} - {job.jobTitle}</DialogTitle>
										<DialogDescription>
											{job.salaryRange}
										</DialogDescription>
										<DialogDescription>
											{job.location}
										</DialogDescription>
									</DialogHeader>
									<DialogBody className={'overflow-hidden flex flex-col justify-end pb-5'}>
										<ScrollArea className={'h-3/4'}>
											{job.jobDescription}
										</ScrollArea>
									</DialogBody>
									<DialogFooter>
										<Button>Summary</Button>


										{job.status === UserJobsEnums.UNSAVED &&
										<Button onClick={()=>keepJob(job) } disabled={isPending} >Keep This Job</Button>
										}

									</DialogFooter>
								</DialogContent>
							</TableRow>
						</Dialog>
					))}
				</TableBody>
			</Table>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" onClick={handlePreviousPage}/>
					</PaginationItem>
					{Array.from({length: totalPages}, (_, index) => (
						<PaginationItem key={index + 1}>
							<PaginationLink href="#" onClick={() => setCurrentPage(index + 1)}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem>
						<PaginationNext href="#" onClick={handleNextPage}/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</Card>
	)
}


export default ResultTable