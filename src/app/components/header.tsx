import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";


const Header = async () => {
	const supabase = await createClient()
	const {data:{user}} = await supabase.auth.getUser()

	return (
		<div className={'border flex justify-between p-4 items-center'}>
			<Link href={'/'}>Job Search</Link>
			{!user && (
				<Link href="/login">
					<Button>Login</Button>
				</Link>
			)}
			{user && (
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png"/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			)}
		</div>
	)
}
export default Header