import { Home, Settings, User } from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem, SidebarTrigger,
} from "@/components/ui/sidebar"
import { SearxngIcon } from "@/lib/icons";

// Menu items.
const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Jobs Search",
		url: "/search-jobs",
		icon: SearxngIcon,
	},
	{
		title: "Profile",
		url: "/profile",
		icon: User,
	},
	{
		title: "Settings",
		url: "/setting",
		icon: Settings,
	},
]

export function AppSidebar () {
	return (
		<Sidebar className=" fiexd z-50 top-20" collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarTrigger className={'border p-4'}/>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon/>
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
