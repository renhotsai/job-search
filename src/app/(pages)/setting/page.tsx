import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import OpenAuthConnectButton from "@/app/components/open-auth-connect-button";
import EmailSetting from "@/app/components/email-setting";


const Setting = async () => {
	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();

	return (

		<div className={'flex items-center justify-center h-full'}>
			<Card className="max-w-2xl mx-auto p-8 space-y-10 rounded-lg shadow-md w-full">
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
					<OpenAuthConnectButton identities={user!.identities!}/>
				</div>
			</Card>
		</div>
	)
}

export default Setting
