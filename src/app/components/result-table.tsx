'use client'

import {
	Table,
	TableBody,
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
import { useEffect, useState } from "react";
import { UnsavedTableRow } from "@/app/components/unsaved-table-row";
import { UserJobsEnums } from "@/lib/types/enums";
import { SavedTableRow } from "@/app/components/saved-table-row";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10; // Number of jobs per page

type ResultTableProps = {
	jobStatus?: UserJobsEnums
	userJobs: UserJob[]
}

const ResultTable = ({jobStatus, userJobs}: ResultTableProps) => {

	const [currentPage, setCurrentPage] = useState(1);
	const [paginatedJobs, setPaginatedJobs] = useState<UserJob[]>([])
	const [totalPages, setTotalPages] = useState(0);
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

	const PaginationComponent = () => {
		if (totalPages > 1) {
			return (
				<Pagination>
					<PaginationContent>
						{currentPage !== 1 &&
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={handlePreviousPage}/>
                </PaginationItem>
						}
						{Array.from({length: totalPages}, (_, index) => (
							<PaginationItem key={index + 1}>
								<PaginationLink href="#" onClick={() => setCurrentPage(index + 1)}>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						{currentPage !== totalPages &&
                <PaginationItem>
                    <PaginationNext href="#" onClick={handleNextPage}/>
                </PaginationItem>
						}
					</PaginationContent>
				</Pagination>
			)
		}
	}

	if (jobStatus === undefined) {
		console.log(`Unsaved Table`)
		return (
			<div>
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
							<UnsavedTableRow key={job.jobId} job={job}/>
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
			</div>
		)
	}

	if (paginatedJobs.length === 0) {
		console.log(`Length === 0`)
		return (
			<div className={'flex flex-col gap-5 h-full justify-center items-center'}>
				<p className={'text-2xl'}>Go Search Jobs</p>
				<Link href={'/search-jobs'}>
					<Button>Search</Button>
				</Link>
			</div>
		)
	}

	console.log(`Saved Table`)
	return (
		<div>
			<Table className="w-full table-fixed">
				<TableHeader className={'sticky top-0 bg-card'}>
					<TableRow>
						<TableHead className="w-1/3">Company</TableHead>
						<TableHead className="w-1/3">Job Title</TableHead>
						<TableHead className="w-1/3">Location</TableHead>
						<TableHead className="w-1/3">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedJobs.map((job) => (
						<SavedTableRow key={job.jobId} job={job}/>
					))}
				</TableBody>
			</Table>
			<PaginationComponent/>
		</div>
	)
}


export default ResultTable