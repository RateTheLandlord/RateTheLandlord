import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {initialFilters, sortOptions} from '@/util/filter-options'
import {
	ActiveFilters,
	AllReviews,
	Filters,
	Review,
	SortOptions,
} from '@/util/interfaces'
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
	const [selectedSort, setSelectedSort] = useState<SortOptions>(sortOptions[0])
	const initialData = fallback['/api/get-reviews'] as Review[]
	const {data} = useSWR<Review[]>('/api/get-reviews', fetcher)

	const [reviews, setReviews] = useState<Review[]>(initialData)

	const [activeFilters, setActiveFilters] = useState<ActiveFilters[]>([])
	const [filters, setFilters] = useState<Filters[]>(initialFilters)

	useEffect(() => {
		let updatedReviews = reviews
		if (selectedSort.name === 'Name A-Z') {
			const result = sortAZ(updatedReviews)
			updatedReviews = result
			setReviews(result)
		} else {
			const result = sortZA(updatedReviews)
			updatedReviews = result
			setReviews(result)
		}
		if (activeFilters.length) {
			const result = checkAgainstFilters(updatedReviews, activeFilters)
			updatedReviews = result
			setReviews(result)
		}
	}, [reviews, selectedSort, activeFilters])

	useEffect(() => {
		if (data) {
			setReviews(data)
		}
	}, [data])

	return (
		<SWRConfig value={{fallback}}>
			<div>
				<ReviewFilters
					filters={filters}
					setFilters={setFilters}
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
					sortOptions={sortOptions}
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
				/>
				<ReviewTable data={data || initialData} />
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
