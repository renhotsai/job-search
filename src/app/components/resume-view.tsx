import { Control, useWatch } from "react-hook-form";
import { UserProfileType } from "@/app/schema/user-profile-type";

type Props={
	control: Control<UserProfileType>
}

const ResumeView = ({control}:Props) => {
	const firstName = useWatch({ control, name: "firstName" });
	const lastName = useWatch({ control, name: "lastName" });
	const email = useWatch({ control, name: "email" });
	const phone = useWatch({ control, name: "phone" });
	const bio = useWatch({ control, name: "bio" });
	const skills = useWatch({ control, name: "skills" });
	const linkedin = useWatch({ control, name: "linkedin" });
	const github = useWatch({ control, name: "github" });

	return (
		<div className={'border'}>
			<div className={'flex flex-col items-center'}>
				<div className={'flex flex-col'}>
					<div>firstName: {firstName}</div>
					<div>lastName:{lastName}</div>
					<div>email:{email}</div>
					<div>phone:{phone}</div>
					<div>bio:{bio}</div>
					<div>linkedin:{linkedin}</div>
					<div>github:{github}</div>
					<div>skills:{skills.map(skill => skill)}</div>
				</div>
			<div>connect Info</div>
			</div>
		</div>
	);
};

export default ResumeView;