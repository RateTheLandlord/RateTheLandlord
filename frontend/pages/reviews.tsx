import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {Data} from '@/util/interfaces'
import {useState} from 'react'

import React from 'react'
import useSWR, {SWRConfig} from 'swr'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Reviews({fallback}: {fallback: [Data]}): JSX.Element {
	const initialData = fallback['/api/get-reviews']
	const {data} = useSWR<[Data]>('/api/get-reviews', fetcher)
	console.log('fallback: ')

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
	const sortOptions = [
		{name: 'Name A-Z', href: '#', current: true},
		{name: 'Name Z-A', href: '#', current: false},
	]
	const activeFilters = [{value: 'canada', label: 'Canada'}]
	return (
		<SWRConfig value={{fallback}}>
			<div>
				<ReviewFilters
					filters={filters}
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
	const data = (await article.json()) as [Data]
	return {
		props: {
			fallback: {
				'/api/get-reviews': data,
			},
		},
		revalidate: 1800,
	}
}
