'use client'

import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { logout } from "@/app/(auth)/action";

export function LogoutButton() {
  return <Button onClick={logout} className={'w-full'}>Logout</Button>
}
