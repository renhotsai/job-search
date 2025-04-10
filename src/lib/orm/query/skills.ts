'use server'
import { db } from "@/lib/orm/db";
import { skills } from "@/lib/orm/schema/skills";

const getSkillsFromDB = async ()=>{
	try{
	 return await db.select().from(skills);
	}catch(error){
		console.error(error)
		throw error
	}
}

export {getSkillsFromDB}