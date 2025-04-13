import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { createClient } from "@/lib/supabase/server";
import Header from "@/app/components/header";
import { ReactNode, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
	children:
		ReactNode
}

const DashboardLayout = async ({children}: Props) => {
	const supabase = await createClient();
	const {data: {user}} = await supabase.auth.getUser();
	return (
		<SidebarProvider>
			<Header/>
			{user &&
          <AppSidebar/>
			}
			<main className={'mt-20 w-full py-14 px-20 border'}>
				{children}
			</main>
		</SidebarProvider>
	)
}

export default DashboardLayout