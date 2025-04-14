'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";


const SearchBoard = () => {

	enum ExperienceLevelEnum {
		Any = 0,
		Intern = 1,
		Assistant,
		Junior,
		"Mid-Senior",
		Director,
		Executive
	}

	enum JobTypeEnum {
		Any = "A",
		"Full Time" = "F",
		"Part Time" = "P",
		Contract = "C",
		Temporary = "T",
		Volunteer = "V",
		Internship = "I",
	}


	enum WorkScheduleEnum {
		Any = 0,
		"OnSite" = 1,
		"Remote",
		"Hybrid"
	}

	const formSchema = z.object({
		experienceLevel: z.string(),
		jobTitle: z.string(),
		jobType: z.string(),
		location: z.string(),
		workSchedule: z.string()
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			experienceLevel: ExperienceLevelEnum.Any.toString(),
			jobTitle: "",
			jobType: JobTypeEnum.Any,
			location: "",
			workSchedule: WorkScheduleEnum.Any.toString(),
		},
	});


	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			const postData = {...data, job_post_time: "r86400"}

			const response = await fetch('/api/jobs/search-jobs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			})

			if (response.ok) {
				const result = await response.json()
				toast("Success", {
					description: `Found ${result.length} jobs`
				})
			}
		} catch (e) {
			console.error(e)
		}
	};


	return (
		<div className={'w-64'}>
			<Card className={'w-full'}>
				<CardHeader>
					<CardTitle> Search </CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-5'}>
							<FormField
								control={form.control}
								name="experienceLevel"
								render={({field}) => (
									<FormItem>
										<FormLabel>Experience Level</FormLabel>
										<FormControl>
											<Select {...field} onValueChange={field.onChange}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Any"/>
												</SelectTrigger>
												<SelectContent>
													{Object.entries(ExperienceLevelEnum)
														.filter(([key]) => isNaN(Number(key)))
														.map(([key, val]) => (
															<SelectItem key={key} value={val.toString()}>
																{key}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="jobTitle"
								render={({field}) => (
									<FormItem>
										<FormLabel>Job Title</FormLabel>
										<FormControl>
											<Input placeholder="Job Title" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="jobType"
								render={({field}) => (
									<FormItem>
										<FormLabel>Job Type</FormLabel>
										<FormControl>
											<Select {...field} onValueChange={field.onChange}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder=""/>
												</SelectTrigger>
												<SelectContent>
													{Object.entries(JobTypeEnum).map(([key, val]) => (
														<SelectItem key={key} value={val}>
															{key}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="location"
								render={({field}) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input placeholder="Location" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="workSchedule"
								render={({field}) => (
									<FormItem>
										<FormLabel>Work Schedule</FormLabel>
										<FormControl>
											<Select {...field} onValueChange={field.onChange}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder={""}/>
												</SelectTrigger>
												<SelectContent>
													{Object.entries(WorkScheduleEnum)
														.filter(([key]) => isNaN(Number(key)))
														.map(([key, val]) => (
															<SelectItem key={key} value={val.toString()}>
																{key}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={form.formState.isSubmitting}>Search</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default SearchBoard