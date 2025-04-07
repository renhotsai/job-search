'use client'

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const MobileSidebarTrigger = () => {
	const {isMobile} = useSidebar();

	if (isMobile) {
		return <SidebarTrigger/>
	}

	return null
}
export default MobileSidebarTrigger