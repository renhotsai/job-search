"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { getSkillsFromDB } from '@/lib/orm/query/skills'
import { Skill } from "@/lib/orm/dto/skills"


const SkillCombobox = ({value = [], onChange, disabled}: {
	value: string[],
	onChange: (value: string[]) => void,
	disabled?: boolean
}) => {
	const [open, setOpen] = React.useState(false)
	const [inputValue, setInputValue] = React.useState("")
	const [skills, setSkills] = useState<Skill[]>([])

	useEffect(() => {
		const getSkill = async () => {
			const skillFromDB = await getSkillsFromDB()
			setSkills(skillFromDB)
		}
		getSkill()
	}, []);

	// Group skills by category
	const groupedSkills = skills.reduce((acc, skill) => {
		if (!acc[skill.category]) {
			acc[skill.category] = [];
		}
		acc[skill.category].push(skill);
		return acc;
	}, {} as Record<string, Skill[]>);

	// Filter skills based on input
	const filteredGroups = Object.entries(groupedSkills).reduce((acc, [category, skills]) => {
		const filtered = skills.filter(skill =>
			skill.skillName.toLowerCase().includes(inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			acc[category] = filtered;
		}
		return acc;
	}, {} as Record<string, Skill[]>);

	if (!disabled) {
		return (
			<div className="flex flex-col gap-2 w-full">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-full justify-between hover:bg-neutral-50"
						>
							{value.length === 0 ? (
								<span className="text-muted-foreground">Select skills...</span>
							) : (
								<span>{value.length} skill{value.length > 1 ? 's' : ''} selected</span>
							)}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
							>
								<path d="m6 9 6 6 6-6"/>
							</svg>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0" align="start">
						<Command className="w-full">
							<CommandInput
								placeholder="Search skills..."
								value={inputValue}
								onValueChange={(value) => setInputValue(value)}
								className="h-9"
							/>
							<CommandList className="max-h-[300px] overflow-auto">
								<CommandEmpty className="py-2 text-center text-sm text-muted-foreground">
									No skills found.
								</CommandEmpty>
								{Object.entries(filteredGroups).map(([category, skills]) => (
									<CommandGroup key={category} heading={category} className="px-1">
										{skills.map((skill) => (
											<CommandItem
												key={skill.id}
												value={skill.skillName}
												onSelect={(currentValue) => {
													const newValue = value.includes(currentValue)
														? value.filter(v => v !== currentValue)
														: [...value, currentValue];
													onChange(newValue);
												}}
												className="px-2 py-1.5 rounded-md hover:bg-neutral-50 cursor-pointer text-sm"
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4 flex-shrink-0 text-primary",
														value.includes(skill.skillName) ? "opacity-100" : "opacity-0"
													)}
												/>
												{skill.skillName}
											</CommandItem>
										))}
									</CommandGroup>
								))}
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		)
	}
}

export default SkillCombobox
