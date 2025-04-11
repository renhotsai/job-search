'use server'

import { db } from "../db"
import { degrees } from "../schema/degrees"

export const getDegreesFromDB = async () => {
	try {
		return await db.select().from(degrees)
	} catch (error) {
		console.error(error)
		throw error
	}
}