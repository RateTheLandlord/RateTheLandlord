import {ActiveFilters, AllReviews, Review} from './interfaces'

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

export const checkAgainstFilters = (
	data: Review[],
	activeFilters: ActiveFilters,
): Review[] => {
	console.log('CHECK FILTERS')
	const filterKeys = Object.keys(activeFilters)
	if (filterKeys.length) {
		const result = data.filter((item) => {
			return filterKeys.every(
				(key) => !!~String(item[key]).toLowerCase().indexOf(activeFilters[key]),
			)
		})
		console.log('Result: ', result)
		return result
	}
}
