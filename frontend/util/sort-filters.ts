import {Review} from './interfaces'

export const sortAZ = (data: Review[]): Review[] => {
	const result = data.sort((a: Review, b: Review) =>
		b.landlord.localeCompare(a.landlord),
	)

	return result
}

export const sortZA = (data: Review[]): Review[] => {
	const result = data.sort((a: Review, b: Review) =>
		a.landlord.localeCompare(b.landlord),
	)

	return result
}
