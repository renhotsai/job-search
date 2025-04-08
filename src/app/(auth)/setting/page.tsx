'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { siGoogle } from 'simple-icons'
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/auth-js";
import Link from "next/link";
import { linkIdentity } from "@/app/(auth)/action";

const GoogleIcon = () => {
	return (
		<svg
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="size-[16px]"
			fill="currentColor"
		>
			<path d={siGoogle.path}/>
		</svg>
	);
}

const Setting = () => {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const {data: {user}} = await supabase.auth.getUser();
			setUser(user);
		};
		getUser();
	}, [supabase]);

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-8">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground mt-2">
					Manage your connected services.
				</p>
			</div>

			<div>
				<h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
				<div className="grid gap-6">
					{user?.identities?.find((identity) => identity.provider === "email") ? (
						<Button
							variant="outline"
							className="w-full flex items-center gap-2 h-12"
							disabled
						>
							<Mail size={16} className="text-gray-500"/>
							<div className="flex-1 text-left">
								<div className="font-medium">Email</div>
								<div className="text-xs text-muted-foreground">Connected</div>
							</div>
						</Button>
					) : (
						<Link href="/src/app/(auth)/setting/email-setting">
							<Button
								variant="outline"
								className="w-full flex items-center gap-2 h-12"
							>
								<Mail size={16} className="text-gray-500"/>
								<div className="flex-1 text-left">
									<div className="font-medium">Email</div>
									<div className="text-xs text-muted-foreground">Not connected</div>
								</div>
							</Button>
						</Link>
					)}

					<Button
						variant="outline"
						className="w-full flex items-center gap-2 h-12"
						disabled={
							user?.identities?.find(
								(identity) => identity.provider === "github"
							)
						}
						onClick={() => {
							linkIdentity('github')
						}}
					>
						<Github size={16} className="text-gray-500"/>
						<div className="flex-1 text-left">
							<div className="font-medium">GitHub</div>
							<div className="text-xs text-muted-foreground">
								{user?.identities?.find((identity) => identity.provider === "github")
									? "Connected"
									: "Not connected"}
							</div>
						</div>
					</Button>

					<Button
						variant="outline"
						className="w-full flex items-center gap-2 h-12"
						disabled={
							user?.identities?.find(
								(identity) => identity.provider === "google"
							)
						}
					>
						<GoogleIcon/>
						<div className="flex-1 text-left">
							<div className="font-medium">Google</div>
							<div className="text-xs text-muted-foreground">
								{user?.identities?.find((identity) => identity.provider === "google")
									? "Connected"
									: "Not connected"}
							</div>
						</div>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Setting
