import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";


const Header = () =>{
 return(
	 <div className={'border flex justify-between p-4 items-center'}>
		 <Link href={'/'}>Job Search</Link>
		 <Avatar>
			 <AvatarImage src="https://github.com/shadcn.png"/>
			 <AvatarFallback>CN</AvatarFallback>
		 </Avatar>
	 </div>
 )
}
export default Header