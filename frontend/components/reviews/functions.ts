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

export const updateReviews = (
	stateFilter: Options | null,
	countryFilter: Options | null,
	cityFilter: Options | null,
	setReviews: (reviews: Array<Review>) => void,
	initialData: Array<Review>,
	search: string,
) => {
	let newReviews: Array<Review> = searchReviews(initialData, search)
	if (countryFilter) {
		const temp: Array<Review> = newReviews.filter(
			(review: Review): boolean => review.countrycode === countryFilter.value,
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
					review.city.toLowerCase() === cityFilter.name.toLowerCase(),
			)
			newReviews = temp
		} else {
			newReviews = newReviews.filter(
				(review: Review): boolean =>
					review.city.toLowerCase() === cityFilter.name.toLowerCase(),
			)
		}
	}

	setReviews(newReviews)
}

export const updateActiveFilters = (
	countryFilter: Options | null,
	stateFilter: Options | null,
	cityFilter: Options | null,
	setActiveFilters: (options: Array<Options>) => void,
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
	setActiveFilters(filters)
}

export const getStateOptions = (data: Array<Review>): Array<Options> => {
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

		return stateOptions
	}

	return []
}

export const getCityOptions = (data: Array<Review>): Array<Options> => {
	if (data.length) {
		const cityOptions = data.map((review, id) => {
			const city = review.city.toLowerCase()
			return {
				id: id + 1,
				name: city.split(' ').map(capitalize).join(' '),
				value: review.city.toLowerCase(),
			}
		})

		return cityOptions
	}
	return []
}

export const searchReviews = (data: Array<Review>, search: string) => {
	if (!search) return data
	return data.filter((review) => {
		return review.landlord.toLowerCase().includes(search.toLowerCase())
	})
}
