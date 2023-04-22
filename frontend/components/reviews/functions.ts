import {capitalize, removeDuplicates} from '@/util/helper-functions'

import {Options} from '@/util/interfaces'
import {Review} from '@/util/interfaces'

export const updateActiveFilters = (
	countryFilter: Options | null,
	stateFilter: Options | null,
	cityFilter: Options | null,
	zipFilter: Options | null,
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
	if (zipFilter) {
		filters.push(zipFilter)
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

		return alphaCity
	}
	return []
}

export const getZipOptions = (
	data: Array<Review> | undefined,
): Array<Options> => {
	if (!data) return []
	if (data.length) {
		const allZipOptions = data.map((review, id) => {
			const zip = review.zip.toUpperCase().replace(/\s+/g, '')
			return {
				id: id + 1,
				name: zip.toUpperCase().replace(/\s+/g, ''),
				value: review.zip.toUpperCase().replace(/\s+/g, ''),
			}
		})

		const zipOptions = removeDuplicates(allZipOptions, 'value')

		const alphaZip = zipOptions.sort((a: Options, b: Options): number =>
			a.name.localeCompare(b.name),
		)

		return alphaZip
	}
	return []
}
