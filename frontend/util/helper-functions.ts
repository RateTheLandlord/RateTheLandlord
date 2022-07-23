import {Options} from './interfaces'

export function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
export const removeDuplicates = (arr: Options[], key: string): Options[] => {
	const check = new Set()
	return arr.filter((obj) => !check.has(obj[key]) && check.add(obj[key]))
}
