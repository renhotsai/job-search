'use client'

import { Button } from '@/components/ui/button'
import { logout } from "@/app/(auth)/action";

export function LogoutButton() {
  return <Button onClick={logout} className={'w-full'}>Logout</Button>
}
