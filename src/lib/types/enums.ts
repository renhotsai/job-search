export enum dbQueryStatus {
	success = "SUCCESS",
	fail = "FAIL",
	waiting = "WAITING"
}


export enum UserJobsEnums {
	UNSAVED = 0,
	SAVED = 1,
	APPLIED = 2,
	INTERVIEWING = 3,
	OFFERED = 4,
	REJECTED = 5,
}


export enum ExperienceLevelEnum {
	Any = 0,
	Intern = 1,
	Assistant,
	Junior,
	"Mid-Senior",
	Director,
	Executive
}

export enum JobTypeEnum {
	Any = "A",
	"Full Time" = "F",
	"Part Time" = "P",
	Contract = "C",
	Temporary = "T",
	Volunteer = "V",
	Internship = "I",
}


export enum WorkScheduleEnum {
	Any = 0,
	"OnSite" = 1,
	"Remote",
	"Hybrid"
}