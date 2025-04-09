'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { linkEmailIdentity } from "@/app/(auth)/action";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/auth-js";
import { toast } from "sonner";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address."
	}).or(z.literal("")),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

const EmailSetting = () => {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const getUser = async () => {
			const {data: {user}} = await supabase.auth.getUser();
			setUser(user)
		}
		getUser()
	}, [supabase]);


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: user?.email ?? "",
			password: "",
			confirmPassword: "",
		},
	})

	async function onSubmit (values: z.infer<typeof formSchema>) {
		const {error} = await linkEmailIdentity(values.password, values.email);
		if (error) {
			toast(`error: ${error.message}`)
		} else {
			toast("Success")
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-2">
					<h2 className="text-2xl font-bold text-gray-900">Email Settings</h2>
					<p className="text-gray-500">Update your email and password.</p>
				</div>

				<div className="grid gap-6">
					<FormField
						control={form.control}
						name="email"
						render={({field}) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder={`${user?.email ?? ""}`} type="email" {...field}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({field}) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="Enter your password" type="password" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({field}) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input placeholder="Confirm your password" type="password" {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex justify-end space-x-4 p-4">
					<Button type="submit">Connect</Button>
				</div>
			</form>
		</Form>
	)
}

export default EmailSetting
