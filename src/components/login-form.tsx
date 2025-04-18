'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ComponentPropsWithoutRef, FormEvent, useState } from 'react'
import { login, signInWithGithub, signInWithGoogle } from "@/app/(auth)/action"
import { GoogleIcon ,GithubIcon } from "@/lib/icons";

export function LoginForm ({className, ...props}: ComponentPropsWithoutRef<'div'>) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const {error} = await login(email, password)
			if (error) throw error
			// Update this route to redirect to an authenticated route. The user already has an active session.
			router.push('/')
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</Link>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? 'Logging in...' : 'Login'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link href="/sign-up" className="underline underline-offset-4">
								Sign up
							</Link>
						</div>
					</form>
					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border"></div>
						</div>
						<div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
						</div>
					</div>
					<div className={'flex gap-5 flex-col'}>
						<form action={signInWithGithub}>
							<Button
								type="submit"
								variant="outline"
								className="w-full flex items-center gap-2"
							>
								<GithubIcon/>
								Sign in with GitHub
							</Button>
						</form>
						<form action={signInWithGoogle}>
							<Button
								type="submit"
								variant="outline"
								className="w-full flex items-center gap-2"
							>
								<GoogleIcon/>
								Sign in with Google
							</Button>
						</form>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
