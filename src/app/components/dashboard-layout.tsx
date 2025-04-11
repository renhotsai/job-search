import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { createClient } from "@/lib/supabase/server";
import Header from "@/app/components/header";
import { ReactNode } from "react";

type Props = {
	children:
		ReactNode
}

const DashboardLayout = async ({children}: Props) => {
	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();

	const mainContentClass = "flex-1 min-h-[calc(100vh-73px)] w-full";
	const layoutWrapperClass = "min-h-screen w-full";
	const contentWrapperClass = "pt-[73px] flex min-h-[calc(100vh-73px)] w-full";


	if (!user) {
		return (
			<div className={layoutWrapperClass}>
				<Header/>
				<div className={contentWrapperClass}>
					<main className={mainContentClass}>
						{children}
					</main>
				</div>
			</div>
		)
	}

	return (
		<SidebarProvider>
			<div className={layoutWrapperClass}>
				<Header/>
				<div className={contentWrapperClass}>
					<AppSidebar/>
					<main className={mainContentClass}>
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}

export default DashboardLayout