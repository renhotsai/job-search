'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { linkIdentity } from "@/app/(auth)/action";
import { GoogleIcon } from "@/lib/icons";
import EmailSetting from "@/app/(auth)/setting/email-setting/page";


const Setting = () => {
	const supabase = createClient();
	const [github, setGithub] = useState(false);
	const [google, setGoogle] = useState(false);


	useEffect(() => {
		const getUser = async () => {
			const {data: {user}} = await supabase.auth.getUser();
			if (user) {
				if (user?.identities?.find((identity) => identity.provider === 'github')) {
					setGithub(true);
				}
				if (user?.identities?.find((identity) => identity.provider === 'google')) {
					setGoogle(true);
				}
			}
		};
		getUser();
	}, [supabase]);

	return (
		<div className={'flex items-center justify-center h-full'}>
			<div className="max-w-2xl mx-auto p-8 space-y-10 bg-white rounded-lg shadow-md w-full">
				<div className="space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">Login Method</h1>
					<p className="text-muted-foreground">
						Manage your login services.
					</p>
				</div>
				<div>
					<EmailSetting/>
				</div>
				<Separator className="my-6"/>
				<div className="space-y-6">
					<h2 className="text-lg font-semibold">Connected Accounts</h2>
					<div className="grid gap-4">
						<Button
							variant="outline"
							className="w-full flex items-center gap-3 h-12 justify-center hover:bg-muted/50 transition-colors"
							disabled={github}
							onClick={() => {
								linkIdentity('github')
							}}
						>
							<div className="flex items-center gap-3 h-12 justify-center">
								<Github size={16} className="text-gray-500"/>
								<div className="flex-1 text-left">
									<div className="font-medium">GitHub</div>
									<div className="text-xs text-muted-foreground">
										{github ? "Connected" : "Not connected"}
									</div>
								</div>
							</div>
						</Button>

						<Button
							variant="outline"
							className="w-full flex items-center gap-3 h-12 hover:bg-muted/50 transition-colors justify-center"
							disabled={google}
							onClick={() => {
								linkIdentity('google')
							}}
						>
							<div className="flex items-center gap-3 h-12 justify-center">
								<GoogleIcon/>
								<div className="flex-1 text-left">
									<div className="font-medium">Google</div>
									<div className="text-xs text-muted-foreground">
										{google ? "Connected" : "Not connected"}
									</div>
								</div>
							</div>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Setting
