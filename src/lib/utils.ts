import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertKeysToSnake<T extends Record<string, unknown>>(obj: T): Record<string, string> {
  const toSnake = (str: string) =>
    str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

  const result: Record<string, string> = {}

  for (const key in obj) {
    const value = obj[key]
    if (value !== undefined && value !== null) {
      result[toSnake(key)] = String(value)
    }
  }

  return result
}


