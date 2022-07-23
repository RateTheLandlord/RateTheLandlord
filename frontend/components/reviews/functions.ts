import {capitalize, removeDuplicates} from '@/util/helper-functions'
import {Options} from '@/util/interfaces'
import {Review} from '@/util/interfaces'

export const sortAZ = (data: Review[]): Review[] => {
	const result = data.sort((a: Review, b: Review): number =>
		b.landlord.localeCompare(a.landlord),
	)

	return result
}

export const sortZA = (data: Review[]): Review[] => {
	const result = data.sort((a: Review, b: Review): number =>
		a.landlord.localeCompare(b.landlord),
	)

	return result
}


export const updateReviews = (
	stateFilter: Options | null,
	countryFilter: Options | null,
	cityFilter: Options | null,
	setReviews: (reviews: Review[]) => void,
	initialData: Review[],
) => {
	let newReviews: Review[] = initialData
	if (countryFilter) {
		const temp: Review[] = newReviews.filter(
			(review: Review): boolean => review.countrycode === countryFilter.value,
		)
		newReviews = temp
	}
	if (stateFilter) {
		if (newReviews.length) {
			const temp: Review[] = newReviews.filter(
				(review: Review): boolean =>
					review.state.toLowerCase() === stateFilter.name.toLowerCase(),
			)
			newReviews = temp
		} else {
			const temp: Review[] = newReviews.filter(
				(review: Review): boolean =>
					review.state.toLowerCase() === stateFilter.name.toLowerCase(),
			)
			newReviews = temp
		}
	}
	if (cityFilter) {
		if (newReviews.length) {
			const temp: Review[] = newReviews.filter(
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
	setActiveFilters: (options: Options[]) => void,
) => {
	const filters: Options[] = []
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

export const getStateOptions = (data: Review[]): Options[] => {
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

export const getCityOptions = (data: Review[]): Options[] => {
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
