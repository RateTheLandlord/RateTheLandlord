import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {Data} from '@/util/interfaces'
import React from 'react'
import useSWR, {SWRConfig} from 'swr'

//This page should be statically generated for better SEO performance with getStaticProps through NextJS with a short regeneration period (30 minute?)
//Once the page is loaded, though, SWR should be used to get up-to-date reviews
//Data passed to Review Filters and Review Table

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Reviews({fallback}: {fallback: [Data]}): JSX.Element {
	const {data} = useSWR<[Data]>('/api/get-reviews', fetcher)
	return (
		<SWRConfig value={{fallback}}>
			Reviews
			<ReviewFilters />
			<ReviewTable data={data} />
		</SWRConfig>
	)
}

export async function getStaticProps() {
	// `getStaticProps` is executed on the server side.
	const article = await fetch('http://localhost:3000/api/get-reviews')
	const data = (await article.json()) as [Data]
	return {
		props: {
			fallback: {
				'/api/get-reviews': data,
			},
		},
	}
}
