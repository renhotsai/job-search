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
import ModeToggle from "@/app/components/mode-toggle";

const Header = async () => {
	const supabase = await createClient()
	const {data: {user}} = await supabase.auth.getUser()


	return (
		<header className={'border flex justify-between p-4 items-center w-screen fixed h-20 top-0 bg-sidebar z-50 gap-5'}>
			<div className={'flex w-full justify-between items-center'}>
				<div>
					<Link href={'/'}>Job Search</Link>
					{user &&
              <MobileSidebarTrigger/>
					}
				</div>
			</div>
			<ModeToggle/>
			{user &&
          <div className={'flex flex-row gap-5'}>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                              <AvatarImage
                                  src={user.user_metadata.avatar_url ?? "https://github.com/shadcn.png"}
                                  alt={user.email ?? "User avatar"}
                              />
                              <AvatarFallback>
																{user.email?.charAt(0).toUpperCase() ?? "U"}
                              </AvatarFallback>
                          </Avatar>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium leading-none">{user.email}</p>
                              <p className="text-xs leading-none text-muted-foreground">
																{user.user_metadata.full_name ?? user.email}
                              </p>
                          </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem>
                          <LogoutButton/>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
			}
			{!user &&
          <Link href="/login">
              <Button>Login</Button>
          </Link>
			}
		</header>
	)
}

export default Header