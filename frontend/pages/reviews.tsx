import React from 'react'
import {SWRConfig} from 'swr'
import Review from '@/components/reviews/review'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

export default function Reviews({fallback}: {fallback: Review[]}): JSX.Element {
	return (
		<SWRConfig value={{fallback}}>
			<Review />
		</SWRConfig>
	)
}

//Page is statically generated at build time and then revalidated at a minimum of every 100 seconds based on when the page is accessed
export async function getStaticProps() {
	const req = await fetch(`http://backend:5000/review`)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data: Review[] = await req.json()

	return {
		props: {
			fallback: {
				'/api/get-reviews': data ? data : [],
			},
		},
		revalidate: 100,
	}
}
