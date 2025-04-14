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
import { JobButtons } from "@/app/components/job-buttons";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";

const PAGE_SIZE = 10; // Number of jobs per page


const ResultTable = ({userJobs}: { userJobs: UserJob[] }) => {

	const [currentPage, setCurrentPage] = useState(1);
	const [paginatedJobs, setPaginatedJobs] = useState<UserJob[]>([])
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const pages = Math.ceil(userJobs.length / PAGE_SIZE);
		setTotalPages(pages)
	}, [userJobs])


	useEffect(() => {
		console.log(`page:${currentPage}`)
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

	return (
		<Card className={'w-full'}>
			<CardHeader>
				<CardTitle className={"text-2xl"}>Jobs</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<Table className="w-full table-fixed">
				<TableHeader className={'sticky top-0 bg-card'}>
					<TableRow>
						<TableHead className="w-1/5">Company</TableHead>
						<TableHead className="w-1/5">Job Title</TableHead>
						<TableHead className="w-1/5">Location</TableHead>
						<TableHead className="w-1/4">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedJobs.map((job) => (
						<TableRow key={job.jobId}>
							<TableCell className={'break-words whitespace-normal'}>{job.companyName}</TableCell>
							<TableCell className={'break-words whitespace-normal'}>{job.jobTitle}</TableCell>
							<TableCell className={'break-words whitespace-normal'}>{job.location}</TableCell>
							<TableCell >
								<JobButtons job={job}/>
							</TableCell>
						</TableRow>
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