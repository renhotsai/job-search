'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/auth-js/src/lib/types";

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

const linkIdentity = async(provider:Provider)=>{
	const supabase = await createClient()
	const { data, error } = await supabase.auth.linkIdentity({'provider': provider})

	if (data.url) {
		redirect(data.url) // use the redirect API for your server framework
	}
}

const logout = async () => {
	const supabase = await createClient()
	await supabase.auth.signOut()
	redirect('/')
}

export { signInWithGithub, logout, linkIdentity }