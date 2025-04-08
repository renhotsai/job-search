import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { createClient } from "@/lib/supabase/server";
import Header from "@/app/components/header";


type Props = {
	children: React.ReactNode
}

const DashboardLayout = async ({children}: Props) => {
	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();
	if (!user) {
		return (
			<div className={'h-full'}>
				<Header/>
				<main className={'h-full'}>
					{children}
				</main>
			</div>
		)
	}

	return (
		<div>
			<SidebarProvider>
				<div>
					<Header/>
					<AppSidebar/>
					<main className={'h-full '}>
						{children}
					</main>
				</div>
			</SidebarProvider>
		</div>
	)
}

export default DashboardLayout