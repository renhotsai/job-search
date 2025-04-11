import { UserWorkExperience } from "@/lib/orm/dto/user-work-experience";
import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UserWorkExperienceSchema, UserWorkExperienceType } from "@/app/schema/user-work-experience";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { dbQueryStatus } from "@/lib/types/enums";
import { Textarea } from "@/components/ui/textarea";
import { getUserWorkExperienceFromDB, insertUserWorkExperienceToDB } from "@/lib/orm/query/user-work-experience";


type props = {
	setUserWorkExperience: Dispatch<SetStateAction<UserWorkExperience[]>>
}

const UserWorkExperienceForm = ({setUserWorkExperience}:props) =>{


	const formatCapitalized = (schoolName: string) => {
		const schoolNameWords = schoolName.split(' ');
		schoolNameWords.map((word, index) => {
			schoolNameWords[index] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		return schoolNameWords.join(' ')
	}


	const form = useForm<UserWorkExperienceType>({
		resolver: zodResolver(UserWorkExperienceSchema),
		defaultValues: {
			company: "",
			jobTitle: "",
			jobDescription: "",
			startDate: new Date(),
			endDate: new Date(),
		},
	});


	const submitAction = async () => {
		const supabase = createClient();
		const {data: {user}} = await supabase.auth.getUser();

		const formData = form.getValues();
		const userId = user!.id
		const data = {userId, ...formData}
		try {
			await insertUserWorkExperienceToDB(data)
			getUserWorkExperienceFromDB(userId).then((userWorkExperienceFromDB) => {
				setUserWorkExperience(() => [...userWorkExperienceFromDB]);
			});

			toast(dbQueryStatus.success, {
				description: `Education Added`
			});
			form.reset()
		} catch (e) {
			console.error(`error:${e}`)
			toast(dbQueryStatus.fail, {
				description: `Error Education Add Failed`
			})
		}
	}

	return(
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitAction)}
			      className="w-xl mx-auto p-6 space-y-8 rounded-lg shadow-md my-6 bg-background text-foreground">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="company"
						render={({field}) => (
							<FormItem>
								<FormLabel>School</FormLabel>
								<FormControl>
									<Input placeholder="company" {...field}
									       onChange={field.onChange}
									       onBlur={(e) => {
										       const formatted = formatCapitalized(e.target.value);
										       form.setValue("company", formatted); // update value in react-hook-form
									       }}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="jobTitle"
						render={({field}) => (
							<FormItem>
								<FormLabel>Degree</FormLabel>
								<FormControl>
									<Input placeholder="Job Title" {...field}
									       onChange={field.onChange}
									       onBlur={(e) => {
										       const formatted = formatCapitalized(e.target.value);
										       form.setValue("jobTitle", formatted); // update value in react-hook-form
									       }}/>
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
					name="jobDescription"
					render={({field}) => (
						<FormItem>
							<FormLabel>Degree</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about your work"
									className="resize-none"
									{...field}
								/>
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

export default UserWorkExperienceForm