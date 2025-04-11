import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserEducationSchema, UserEducationType } from "@/app/schema/user-education";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getDegreesFromDB } from "@/lib/orm/query/degrees";
import { Degrees } from "@/app/schema/degrees";
import {
	Select,
	SelectContent, SelectGroup,
	SelectItem, SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { getFieldOfStudyFromDB } from "@/lib/orm/query/field-of-study";
import { FieldOfStudy } from "@/app/schema/field-of-study";
import { insertUserEducationToDB } from "@/lib/orm/query/user-education";
import { dbQueryStatus } from "@/lib/types/enums";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

import { UserEducation } from "@/lib/types/user";

type props = {
	setUserEducations: Dispatch<SetStateAction<UserEducation[]>>
}

const UserEducationForm = ({ setUserEducations}: props) => {

	const [degrees, setDegrees] = useState<Degrees[]>([])
	const [degreeType, setDegreeType] = useState<string[]>([])
	const [fieldOfStudies, setFieldOfStudies] = useState<FieldOfStudy[]>([])
	useEffect(() => {
		getDegreesFromDB().then((degrees) => {
			setDegrees(degrees)
			const uniqueTypes = [...new Set(degrees.map(degree => degree.type))];
			setDegreeType(uniqueTypes)
		})

		getFieldOfStudyFromDB().then((fieldOfStudies) => {
			setFieldOfStudies(fieldOfStudies)
		})
	}, [])

	const formatCapitalized = (schoolName: string) => {
		const schoolNameWords = schoolName.split(' ');
		schoolNameWords.map((word, index) => {
			schoolNameWords[index] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		return schoolNameWords.join(' ')
	}

	const form = useForm<UserEducationType>({
		resolver: zodResolver(UserEducationSchema),
		defaultValues: {
			school: "",
			degree: "",
			fieldOfStudy: "",
		},
	})


	const submitAction = async () => {
		const supabase = createClient();
		const {data: {user}} = await supabase.auth.getUser();

		const formData = form.getValues();
		const userId = user!.id
		const data = {userId, ...formData}
		try {
			const result=await insertUserEducationToDB(data)
			setUserEducations((prevState) => [...prevState, result])

			toast(dbQueryStatus.success, {
				description: `Education Added on ${result.updateDate}`
			});
			form.reset()
		} catch (e) {
			console.error(`error:${e}`)
			toast(dbQueryStatus.fail, {
				description: `Error Education Add Failed`
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitAction)}
			      className="w-xl mx-auto p-6 space-y-8 rounded-lg shadow-md my-6 bg-background text-foreground">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="school"
						render={({field}) => (
							<FormItem>
								<FormLabel>School</FormLabel>
								<FormControl>
									<Input placeholder="school" {...field}
									       onChange={field.onChange}
									       onBlur={(e) => {
										       const formatted = formatCapitalized(e.target.value);
										       form.setValue("school", formatted); // update value in react-hook-form
									       }}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="degree"
						render={({field}) => (
							<FormItem>
								<FormLabel>Degree</FormLabel>
								<FormControl>
									<Select {...field} onValueChange={field.onChange}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Degree"/>
										</SelectTrigger>
										<SelectContent>
											{degreeType.map((degreeType) =>
												<SelectGroup key={degreeType}>
													<SelectLabel>{degreeType}</SelectLabel>
													{degrees.filter(degree => degree.type === degreeType).map((degree) =>
														<SelectItem key={degree.id}
														            value={degree.name}
														>
															{degree.name}
														</SelectItem>
													)}
												</SelectGroup>
											)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="startDate"
						render={({field}) => (
							<FormItem className="flex flex-col">
								<FormLabel>Start Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endDate"
						render={({field}) => (
							<FormItem className="flex flex-col">
								<FormLabel>Graduation Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="fieldOfStudy"
					render={({field}) => (
						<FormItem>
							<FormLabel>Degree</FormLabel>
							<FormControl>
								<Select {...field} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Field of Study"/>
									</SelectTrigger>
									<SelectContent>
										{fieldOfStudies.map((fieldOfStudy) =>
											<SelectItem key={fieldOfStudy.id}
											            value={fieldOfStudy.name}
											>
												{fieldOfStudy.name}
											</SelectItem>
										)}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				<div className={'flex justify-end'}>
					<Button type={"submit"}>
						Add
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default UserEducationForm