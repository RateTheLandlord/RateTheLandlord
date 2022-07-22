import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {sortOptions} from '@/util/filter-options'
import {AllReviews, Options, Review, NewFilter} from '@/util/interfaces'
import {sortAZ, sortZA} from '@/util/sort-filters'
import countries from '@/util/countries.json'

import React, {useEffect, useState} from 'react'
import useSWR, {SWRConfig} from 'swr'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const countryCodes = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US',
)

export default function Reviews({
	fallback,
}: {
	fallback: [AllReviews]
}): JSX.Element {
	const [selectedSort, setSelectedSort] = useState<Options>(sortOptions[0])
	const [countryFilter, setCountryFilter] = useState<Options | null>()
	const [stateFilter, setStateFilter] = useState<Options | null>()
	const [cityFilter, setCityFilter] = useState<Options | null>()
	const [initialData, setInitialData] = useState<Review[]>(
		fallback['/api/get-reviews'],
	)
	const {data} = useSWR<Review[]>('/api/get-reviews', fetcher)

	const [activeFilters, setActiveFilters] = useState<Options[] | null>()

	const [reviews, setReviews] = useState<Review[]>(initialData)

	const capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	const allStateOptions = initialData.map((review, id) => {
		const state = review.state.toLowerCase()
		return {
			id: id + 1,
			name: state.split(' ').map(capitalize).join(' '),
			value: review.state,
		}
	})
	const removeDuplicates = (arr, key) => {
		const check = new Set()
		return arr.filter((obj) => !check.has(obj[key]) && check.add(obj[key]))
	}

	const stateOptions = removeDuplicates(allStateOptions, 'name')

	const countryOptions = countryCodes.map((item, ind) => {
		return {id: ind + 1, name: countries[item], value: item}
	})

	const cityOptions = initialData.map((review, id) => {
		const city = review.city.toLowerCase()
		return {
			id: id + 1,
			name: city.split(' ').map(capitalize).join(' '),
			value: review.city.toLowerCase(),
		}
	})

	const updateActiveFilters = () => {
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

	const updateReviews = () => {
		let newReviews: Review[] = initialData
		if (countryFilter) {
			const temp = reviews.filter((review) => {
				return review.countrycode === countryFilter.value
			})
			newReviews = temp
		}
		if (stateFilter) {
			console.log('State Filter: ', stateFilter)
			if (newReviews.length) {
				const temp = newReviews.filter((review) => {
					return review.state.toLowerCase() === stateFilter.name.toLowerCase()
				})
				newReviews = temp
			} else {
				console.log('Here')
				console.log(reviews)
				const temp = reviews.filter((review) => {
					return review.state.toLowerCase() === stateFilter.name.toLowerCase()
				})
				newReviews = temp
			}
		}
		if (cityFilter) {
			if (newReviews.length) {
				newReviews = newReviews.filter((review) => {
					return review.city.toLowerCase() === cityFilter.name.toLowerCase()
				})
			} else {
				newReviews = reviews.filter((review) => {
					return review.city.toLowerCase() === cityFilter.name.toLowerCase()
				})
			}
		}
		console.log('New Reviews: ', newReviews)
		setReviews(newReviews)
	}

	const removeFilter = (index: number) => {
		if (activeFilters?.length) {
			if (cityFilter === activeFilters[index]) setCityFilter(null)
			if (stateFilter === activeFilters[index]) setStateFilter(null)
			if (countryFilter === activeFilters[index]) setCountryFilter(null)
		}
	}

	useEffect(() => {
		updateActiveFilters()
		updateReviews()
	}, [cityFilter, stateFilter, countryFilter])

	useEffect(() => {
		if (selectedSort.name === 'Name A-Z') {
			const result = sortAZ(reviews)
			setReviews(result)
		} else {
			const result = sortZA(reviews)
			setReviews(result)
		}
	}, [selectedSort])

	useEffect(() => {
		if (data) {
			setReviews(data)
			setInitialData(data)
		}
	}, [data])

	return (
		<SWRConfig value={{fallback}}>
			<div>
				<ReviewFilters
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
					sortOptions={sortOptions}
					activeFilters={activeFilters}
					countryFilter={countryFilter}
					setCountryFilter={setCountryFilter}
					stateFilter={stateFilter}
					setStateFilter={setStateFilter}
					cityFilter={cityFilter}
					setCityFilter={setCityFilter}
					cityOptions={cityOptions}
					stateOptions={stateOptions}
					countryOptions={countryOptions}
					removeFilter={removeFilter}
				/>
				<ReviewTable data={reviews || initialData} />
			</div>
		</SWRConfig>
	)
}

//Page is statically generated at build time and then revalidated at a minimum of every 30 minutes based on when the page is accessed
export async function getStaticProps() {
	//URL will need to be updated to match site URL
	const article = await fetch('http://localhost:3000/api/get-reviews')
	const data = (await article.json()) as [Review]
	return {
		props: {
			fallback: {
				'/api/get-reviews': data,
			},
		},
		revalidate: 1800,
	}
}
