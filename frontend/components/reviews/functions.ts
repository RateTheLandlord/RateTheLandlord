import {capitalize, removeDuplicates} from '@/util/helper-functions'

import {Options} from '@/util/interfaces'

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
	states: string[] | undefined,
): Array<Options> => {
	if (!states) return []
	if (states.length) {
		const allStateOptions = states.map((s, id) => {
			const state = s.toLowerCase()
			return {
				id: id + 1,
				name: state.split(' ').map(capitalize).join(' '),
				value: s,
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
	cities: string[] | undefined,
): Array<Options> => {
	if (!cities) return []
	if (cities.length) {
		const allCityOptions = cities.map((c, id) => {
			const city = c.toLowerCase().trim()
			return {
				id: id + 1,
				name: city.split(' ').map(capitalize).join(' '),
				value: c.toLowerCase().trim(),
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

export const getZipOptions = (zips: string[] | undefined): Array<Options> => {
	if (!zips) return []
	if (zips.length) {
		const allZipOptions = zips.map((z, id) => {
			const zip = z.toUpperCase().replace(/\s+/g, '')
			return {
				id: id + 1,
				name: zip.toUpperCase().replace(/\s+/g, ''),
				value: z.toUpperCase().replace(/\s+/g, ''),
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
