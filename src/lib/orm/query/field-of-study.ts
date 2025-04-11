'use server'

import { db } from "../db"
import { fieldOfStudy } from "@/lib/orm/schema/field-of-study";

export const getFieldOfStudyFromDB = async () => {
	try {
		return await db.select().from(fieldOfStudy)
	} catch (error) {
		console.error(error)
		throw error
	}
}