import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem, SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
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

export function AppSidebar() {
	return (
		<Sidebar className={'inset-y-auto'} collapsible={"icon"}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarTrigger className={'border p-4'} />
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
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
