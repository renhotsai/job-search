import { UserJobsEnums } from "@/lib/types/enums";

export interface UserJobUpdateDto {
	id:number,
	status:UserJobsEnums
}