import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertKeysToSnake<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const toSnake = (str: string) =>
    str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

  const result: Record<string, unknown> = {}

  for (const key in obj) {
    const value = obj[key]
    if (value !== undefined) {
      result[toSnake(key)] = value
    }
  }

  return result
}


