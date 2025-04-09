'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/auth-js/src/lib/types";


const login = async (email: string, password: string) => {
	const supabase = await createClient();
	return await supabase.auth.signInWithPassword({
		email,
		password,
	})
}

async function signInWithGithub () {
	const supabase = await createClient();

	const {data, error} = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	})

	if (data.url) {
		redirect(data.url) // use the redirect API for your server framework
	}
}

async function signInWithGoogle () {
	const supabase = await createClient();

	const {data, error} = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	})

	if (data.url) {
		redirect(data.url) // use the redirect API for your server framework
	}
}


const linkIdentity = async (provider: Provider) => {
	const supabase = await createClient()
	const {data, error} = await supabase.auth.linkIdentity({'provider': provider})

	if (data.url) {
		redirect(data.url) // use the redirect API for your server framework
	}
}

const linkEmailIdentity = async (password: string, email?: string) => {
	const supabase = await createClient()
	const {data: {user}} =await supabase.auth.getUser();
	if (!email || email === '') {
		return await supabase.auth.updateUser({password: password})
	}
	return await supabase.auth.updateUser({password: password, email: email})
}

const logout = async () => {
	const supabase = await createClient()
	await supabase.auth.signOut()
	redirect('/')
}

export { signInWithGithub, logout, linkIdentity, signInWithGoogle, linkEmailIdentity, login }