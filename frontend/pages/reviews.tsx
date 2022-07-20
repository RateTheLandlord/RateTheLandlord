import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {sortOptions} from '@/util/filter-options'
import {AllReviews, Options, Review, NewFilter} from '@/util/interfaces'
import {checkAgainstFilters, sortAZ, sortZA} from '@/util/sort-filters'

import React, {useEffect, useState} from 'react'
import useSWR, {SWRConfig} from 'swr'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Reviews({
	fallback,
}: {
	fallback: [AllReviews]
}): JSX.Element {
	const [selectedSort, setSelectedSort] = useState<Options>(sortOptions[0])
	const [countryFilter, setCountryFilter] = useState<Options | null>()
	const [stateFilter, setStateFilter] = useState<Options | null>()
	const [cityFilter, setCityFilter] = useState<Options | null>()
	const initialData = fallback['/api/get-reviews'] as Review[]
	const {data} = useSWR<Review[]>('/api/get-reviews', fetcher)

	const [reviews, setReviews] = useState<Review[]>(initialData)

	const [activeFilters, setActiveFilters] = useState<Options[] | null>()

	console.log('Active: ', activeFilters)

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
		let newReviews: Review[] = []
		if (countryFilter) {
			const temp = reviews.filter((review) => {
				review.countrycode === countryFilter.value
			})
			newReviews = temp
		}
		if (stateFilter) {
			if (newReviews.length) {
				const temp = newReviews.filter((review) => {
					review.state.toLowerCase() === stateFilter.name.toLowerCase()
				})
				newReviews = temp
			} else {
				const temp = reviews.filter((review) => {
					review.state.toLowerCase() === stateFilter.name.toLowerCase()
				})
				newReviews = temp
			}
		}
		if (cityFilter) {
			if (newReviews.length) {
				newReviews = newReviews.filter((review) => {
					review.city.toLowerCase() === cityFilter.name.toLowerCase()
				})
			} else {
				newReviews = reviews.filter((review) => {
					review.city.toLowerCase() === cityFilter.name.toLowerCase()
				})
			}
		}
		console.log(newReviews)
		setReviews(newReviews)
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
