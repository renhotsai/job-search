import { siGithub, siGoogle } from "simple-icons";

const GoogleIcon = () => {
	return (
		<svg
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="size-[16px]"
			fill="currentColor"
		>
			<path d={siGoogle.path}/>
		</svg>
	);
}

const GithubIcon = () => {
	return (
		<svg
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="size-[16px]"
			fill="currentColor"
		>
			<path d={siGithub.path}/>
		</svg>
	);
}
export { GoogleIcon,GithubIcon }