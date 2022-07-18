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
	activeFilters: ActiveFilters[],
): Review[] => {
	const result = data.filter((item) => {
		for (let obj of activeFilters) {
			console.log('OBJ: ', obj)
			if (item[obj.type] === obj.value) {
				console.log('ITEM FOUND')
				return item
			}
		}
	})
	return result
}
