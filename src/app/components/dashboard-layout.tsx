import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import { createClient } from "@/lib/supabase/server";


type Props = {
	children: React.ReactNode
}

const DashboardLayout = async ({children}: Props) => {
	const supabase = await createClient();
	const {data:{user}} = await supabase.auth.getUser();
	console.log(`user: ${user}`)
	if (!user) {
		return (
			<main>
				{children}
			</main>
		)
	}

	return (
		<div>
			<SidebarProvider>
				<AppSidebar/>
				<main>
					<SidebarTrigger/>
					{children}
				</main>
			</SidebarProvider>
		</div>
	)
}

export default DashboardLayout