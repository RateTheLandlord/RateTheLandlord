import {capitalize, removeDuplicates} from '@/util/helper-functions'
import {Options} from '@/util/interfaces'
import {Review} from '@/util/interfaces'

export const sortAZ = (data: Array<Review>) => {
	if (data.length) {
		const result = data.sort((a: Review, b: Review): number =>
			b.landlord.localeCompare(a.landlord),
		)

		return result
	}

	return data
}

export const sortZA = (data: Array<Review>): Array<Review> => {
	const result = data.sort((a: Review, b: Review): number =>
		a.landlord.localeCompare(b.landlord),
	)

	return result
}

export const sortNewest = (data: Array<Review>): Array<Review> => {
	const result = data.sort((a: Review, b: Review): number => {
		const dateA = new Date(a.dataadded)
		const dateB = new Date(b.dataadded)
		return dateB.valueOf() - dateA.valueOf()
	})

	return result
}

export const sortOldest = (data: Array<Review>): Array<Review> => {
	const result = data.sort((a: Review, b: Review): number => {
		const dateA = new Date(a.dataadded)
		const dateB = new Date(b.dataadded)
		return dateA.valueOf() - dateB.valueOf()
	})

	return result
}

const updateSort = (sortStr: string, reviews: Review[]): Review[] => {
	if (sortStr === 'Name A-Z') {
		return sortAZ(reviews)
	} else if (sortStr === 'Name Z-A') {
		return sortZA(reviews)
	} else if (sortStr === 'Newest') {
		return sortNewest(reviews)
	} else if (sortStr === 'Oldest') {
		return sortOldest(reviews)
	} else {
		return reviews
	}
}

export const updateReviews = (
	stateFilter: Options | null,
	countryFilter: Options | null,
	cityFilter: Options | null,
	initialData: Array<Review>,
	search: string,
	sort: string,
) => {
	let newReviews: Array<Review> = searchReviews(initialData, search)
	if (countryFilter) {
		const temp: Array<Review> = newReviews.filter(
			(review: Review): boolean => review.country_code === countryFilter.value,
		)
		newReviews = temp
	}
	if (stateFilter) {
		if (newReviews.length) {
			const temp: Array<Review> = newReviews.filter(
				(review: Review): boolean =>
					review.state.toLowerCase() === stateFilter.name.toLowerCase(),
			)
			newReviews = temp
		} else {
			const temp: Array<Review> = newReviews.filter(
				(review: Review): boolean =>
					review.state.toLowerCase() === stateFilter.name.toLowerCase(),
			)
			newReviews = temp
		}
	}
	if (cityFilter) {
		if (newReviews.length) {
			const temp: Array<Review> = newReviews.filter(
				(review: Review): boolean =>
					review.city.toLowerCase().trim() ===
					cityFilter.name.toLowerCase().trim(),
			)
			newReviews = temp
		} else {
			newReviews = newReviews.filter(
				(review: Review): boolean =>
					review.city.toLowerCase().trim() ===
					cityFilter.name.toLowerCase().trim(),
			)
		}
	}

	newReviews = updateSort(sort, newReviews)

	return newReviews
}

export const updateActiveFilters = (
	countryFilter: Options | null,
	stateFilter: Options | null,
	cityFilter: Options | null,
) => {
	const filters: Array<Options> = []
	if (countryFilter) {
		filters.push(countryFilter)
	}
	if (stateFilter) {
		filters.push(stateFilter)
	}
	if (cityFilter) {
		filters.push(cityFilter)
	}
	return filters
}

export const getStateOptions = (
	data: Array<Review> | undefined,
): Array<Options> => {
	if (!data) return []
	if (data.length) {
		const allStateOptions = data.map((review, id) => {
			const state = review.state.toLowerCase()
			return {
				id: id + 1,
				name: state.split(' ').map(capitalize).join(' '),
				value: review.state,
			}
		})

		const stateOptions = removeDuplicates(allStateOptions, 'name')

		const alphaOptions = stateOptions.sort((a: Options, b: Options): number =>
			a.name.localeCompare(b.name),
		)

		return alphaOptions
	}

	return []
}

export const getCityOptions = (
	data: Array<Review> | undefined,
): Array<Options> => {
	if (!data) return []
	if (data.length) {
		const allCityOptions = data.map((review, id) => {
			const city = review.city.toLowerCase().trim()
			return {
				id: id + 1,
				name: city.split(' ').map(capitalize).join(' '),
				value: review.city.toLowerCase().trim(),
			}
		})

		const cityOptions = removeDuplicates(allCityOptions, 'value')

		const alphaCity = cityOptions.sort((a: Options, b: Options): number =>
			a.name.localeCompare(b.name),
		)

		console.log(alphaCity)

		return alphaCity
	}
	return []
}

export const searchReviews = (data: Array<Review>, search: string) => {
	if (!search) return data
	return data.filter((review) => {
		return review.landlord.toLowerCase().includes(search.toLowerCase())
	})
}
