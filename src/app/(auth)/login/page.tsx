import { LoginForm } from '@/components/login-form'
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
