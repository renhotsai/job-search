import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import MobileSidebarTrigger from "@/app/components/mobile-sidebar-trigger";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutButton } from "@/components/logout-button";


const Header = async () => {
	const supabase = await createClient()
	const {data: {user}} = await supabase.auth.getUser()

	if (!user) {
		return (
			<div className={'border flex justify-between p-4 items-center w-screen'}>
				<div>
					<Link href={'/'}>Job Search</Link>
				</div>
				<Link href="/login">
					<Button>Login</Button>
				</Link>
			</div>
		)
	}


	return (
		<div className={'border flex justify-between p-4 items-center w-screen'}>
			<div className={'flex w-full justify-between items-center'}>
				<div>
					<Link href={'/'}>Job Search</Link>
					<MobileSidebarTrigger/>
				</div>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={user.user_metadata.avatar_url ?? "https://github.com/shadcn.png"}/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<Link href={'/user'}>Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem><LogoutButton/></DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
export default Header