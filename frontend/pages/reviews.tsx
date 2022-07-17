import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {AllReviews, Review, SortOptions} from '@/util/interfaces'
import {sortAZ, sortZA} from '@/util/sort-filters'

import React, {useEffect, useState} from 'react'
import useSWR, {SWRConfig} from 'swr'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const sortOptions = [
	{id: 1, name: 'Name A-Z'},
	{id: 2, name: 'Name Z-A'},
]

export default function Reviews({
	fallback,
}: {
	fallback: [AllReviews]
}): JSX.Element {
	const [selectedSort, setSelectedSort] = useState<SortOptions>(sortOptions[0])
	const initialData = fallback['/api/get-reviews'] as [Review]
	const {data} = useSWR<[Review]>('/api/get-reviews', fetcher)

	const [reviews, setReviews] = useState<[Review]>(initialData)

	useEffect(() => {
		if (selectedSort.name === 'Name A-Z') {
			const result = sortAZ(reviews)
			setReviews(result)
		} else {
			const result = sortZA(reviews)
			setReviews(result)
		}
	}, [reviews, selectedSort])

	useEffect(() => {
		if (data) {
			setReviews(data)
		}
	}, [data])

	const filters = [
		{
			id: 'country',
			name: 'Country',
			options: [
				{value: 'canada', label: 'Canada', checked: false},
				{value: 'usa', label: 'USA', checked: false},
			],
		},
		{
			id: 'province/state',
			name: 'Province / State',
			options: [
				//Will need to load in available province/state info
				{value: 'ontario', label: 'Ontario', checked: false},
			],
		},
		{
			id: 'city',
			name: 'City',
			options: [
				//Will need to load in available city info
				{value: 'toronto', label: 'Toronto', checked: false},
			],
		},
	]

	const activeFilters = [{value: 'canada', label: 'Canada'}]
	return (
		<SWRConfig value={{fallback}}>
			<div>
				<ReviewFilters
					filters={filters}
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
					sortOptions={sortOptions}
					activeFilters={activeFilters}
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
