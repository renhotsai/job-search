
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email(),
	fullName: z.string().min(2, {
		message: "Full name must be at least 2 characters.",
	}),
	bio: z.string().max(500, {
		message: "Bio must not exceed 500 characters.",
	}),
	linkedin: z.string().url().optional(),
	github: z.string().url().optional(),
})

const UserProfileForm = () =>{

// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email:"",
			fullName: "",
			bio: "",
			linkedin: "",
			github: "",
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}



	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
					<p className="text-gray-500">Update your profile information to help employers find you.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="johndoe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="user@example.com" type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<textarea
									{...field}
									className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									placeholder="Tell us about yourself..."
								/>
							</FormControl>
							<FormDescription>
								Brief description about your professional background and interests.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="linkedin"
						render={({ field }) => (
							<FormItem>
								<FormLabel>LinkedIn Profile</FormLabel>
								<FormControl>
									<Input placeholder="https://linkedin.com/in/..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="github"
						render={({ field }) => (
							<FormItem>
								<FormLabel>GitHub Profile</FormLabel>
								<FormControl>
									<Input placeholder="https://github.com/..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex justify-end space-x-4">
					<Button type="button" variant="outline">Cancel</Button>
					<Button type="submit">Save Changes</Button>
				</div>
			</form>
		</Form>
	)
}

export default UserProfileForm
