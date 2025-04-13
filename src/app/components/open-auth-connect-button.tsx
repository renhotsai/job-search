'use client'
import { Button } from "@/components/ui/button";
import { linkIdentity } from "@/app/(auth)/action";
import { GithubIcon, GoogleIcon } from "@/lib/icons";
import { UserIdentity } from "@supabase/auth-js";
import { useEffect, useState } from "react";

const OpenAuthConnectButton = ({identities}: { identities: UserIdentity[] }) => {


	const [githubConnect, setGithubConnect] = useState(false)
	const [googleConnect, setGoogleConnect] = useState(false)

	useEffect(() => {
		setGithubConnect(
			identities.some((identity) => identity.provider === 'github')
		)
		setGoogleConnect(
			identities.some((identity) => identity.provider === 'google')
		)
	}, [identities])

	return (
		<div className="grid gap-4">
			<Button
				variant="outline"
				className="w-full flex items-center gap-3 h-12 justify-center hover:bg-background transition-colors"
				disabled={githubConnect}
				onClick={() => {
					linkIdentity('github').then()
				}}
			>
				<div className="flex items-center gap-3 h-12 justify-center">
					<GithubIcon/>
					<div className="flex-1 text-left">
						<div className="font-medium">Google</div>
						<div className="text-xs text-muted-foreground">
							{githubConnect ? "Connected" : "Not connected"}
						</div>
					</div>
				</div>
			</Button>
			<Button
				variant="outline"
				className="w-full flex items-center gap-3 h-12 justify-center hover:bg-background transition-colors"
				disabled={googleConnect}
				onClick={() => {
					linkIdentity('google').then()
				}}
			>
				<div className="flex items-center gap-3 h-12 justify-center">
					<GoogleIcon/>
					<div className="flex-1 text-left">
						<div className="font-medium">GitHub</div>
						<div className="text-xs text-muted-foreground">
							{googleConnect ? "Connected" : "Not connected"}
						</div>
					</div>
				</div>
			</Button>
		</div>
	)
}

export default OpenAuthConnectButton