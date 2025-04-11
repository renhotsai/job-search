import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SkillCombobox from "@/app/components/skill-combobox";
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { dbQueryStatus } from "@/lib/types/enums";
import { createClient } from "@/lib/supabase/client"
import { getUserProfileFromDB, insertUserProfile } from "@/lib/orm/query/user-profile"
import { UserProfileType as UserProfileType } from "@/app/schema/user-profile-type";


type Props = {
	form: ReturnType<typeof useForm<UserProfileType>>
}

const UserProfile = ({form}: Props) => {
	const [editable, setEditable] = useState(false);
	const [userProfile, setUserProfile] = useState<UserProfileType | null>(null)
	useEffect(() => {
		const getUserProfile = async () => {
			const supabase = createClient();
			const {data: {user}} = await supabase.auth.getUser();
			const userProfileFromDB = await getUserProfileFromDB(user!.id);
			if (userProfileFromDB) {
				setUserProfile(userProfileFromDB)
			} else {
				setEditable(true)
			}
		}
		getUserProfile().then()
	}, [])


	useEffect(() => {
		if (userProfile !== null) {
			form.reset({
				lastName: userProfile.lastName,
				firstName: userProfile.firstName,
				email: userProfile.email,
				bio: userProfile.bio ?? "",
				phone: userProfile.phone ?? "",
				linkedin: userProfile.linkedin ?? "",
				github: userProfile.github ?? "",
				skills: userProfile.skills ?? [],
			})
		}
	}, [form, userProfile]);

	const saveProfile = async () => {
		const supabase = createClient();
		const {data: {user}} = await supabase.auth.getUser();

		const userId = user!.id
		const formData = form.getValues();
		const data = {userId, ...formData}
		try {
			const updateDate = await insertUserProfile(data)
			toast(dbQueryStatus.success, {
				description: `Profile updated on ${updateDate}`
			})
		} catch (e) {
			console.error(`error:${e}`)
			toast(dbQueryStatus.fail, {
				description: `Error saving profile`
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(saveProfile)}
			      className="w-2xl mx-auto p-6 space-y-8 rounded-lg shadow-md bg-background text-foreground">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold ">Profile Information</h2>
					{editable && <p className="text-gray-500">Update your profile information to help employers find you.</p>}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="firstName"
						render={({field}) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} disabled={!editable}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({field}) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="johndoe" {...field} disabled={!editable}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({field}) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="user@example.com" type="email" {...field} disabled={!editable}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({field}) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input placeholder="1234567890" type={'text'} {...field} disabled={!editable}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="skills"
					render={({field}) => (
						<FormItem>
							<FormLabel>Skills</FormLabel>
							<FormControl>
								<div className="space-y-4">
									<SkillCombobox
										value={field.value || []}
										onChange={field.onChange}
										disabled={!editable}
									/>
									<div className="flex flex-wrap gap-2">
										{(field.value || []).map((skill) => (
											<Badge key={skill}
											       className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
												{skill}
												{editable &&
                            <button
                                type="button"
                                onClick={() => {
																	field.onChange(field.value?.filter(s => s !== skill))
																}}
                                className="hover:text-destructive focus:outline-none"
                            >
                                ×
                            </button>
												}
											</Badge>
										))}
									</div>
								</div>
							</FormControl>
							{editable &&
                  <FormDescription>
                      Select your technical skills and expertise
                  </FormDescription>
							}
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({field}) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									placeholder="Tell us about yourself..."
									disabled={!editable}
								/>
							</FormControl>
							{editable &&
                  <FormDescription>
                      Brief description about your professional background and interests.
                  </FormDescription>
							}
							<FormMessage/>
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="linkedin"
						render={({field}) => (
							<FormItem>
								<FormLabel>LinkedIn Profile</FormLabel>
								<FormControl>
									<Input placeholder="https://linkedin.com/in/..." {...field} disabled={!editable}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="github"
						render={({field}) => (
							<FormItem>
								<FormLabel>GitHub Profile</FormLabel>
								<FormControl>
									<Input placeholder="https://github.com/..." {...field} disabled={!editable}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
				</div>
				{!editable &&
            <div className="flex justify-end space-x-4">
                <Button type="button" onClick={() => setEditable(true)}>Update</Button>
            </div>
				}
				{editable &&
            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => {
									setEditable(false)
									form.clearErrors()
								}}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </div>
				}
			</form>
		</Form>
	)
}

export default UserProfile
