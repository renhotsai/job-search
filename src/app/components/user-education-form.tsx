
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { educationSchema } from "@/app/(pages)/resume/schema";


const UserEducationForm = () => {
	const form = useForm<z.infer<typeof educationSchema>>({
		resolver: zodResolver(educationSchema),
		defaultValues: {
			school: "",
			degree: "",
			fieldOfStudy: "",
			startDate: "",
			endDate: "",
		},
	})

	return (
			<Form {...form}>
				<form className="w-xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md my-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="school"
						render={({field}) => (
							<FormItem>
								<FormLabel>School</FormLabel>
								<FormControl>
									<Input placeholder="school" {...field} onChange={field.onChange} />
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
									<Input placeholder="school" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="startDate"
						render={({field}) => (
							<FormItem>
								<FormLabel>Start Date</FormLabel>
								<FormControl>
									<Input placeholder="school" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endDate"
						render={({field}) => (
							<FormItem>
								<FormLabel>End Date</FormLabel>
								<FormControl>
									<Input placeholder="school" {...field} />
								</FormControl>
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
								<FormLabel>Field of Study</FormLabel>
								<FormControl>
									<Input placeholder="Field of Study" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</form>
			</Form>
	)
}

export default UserEducationForm