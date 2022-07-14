import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import React from 'react'

//This page should be statically generated for better SEO performance with getStaticProps through NextJS with a short regeneration period (30 minute?)
//Once the page is loaded, though, SWR should be used to get up-to-date reviews
//Data passed to Review Filters and Review Table

export default function Reviews(): JSX.Element {
	return (
		<div>
			Reviews
			<ReviewFilters />
			<ReviewTable />
		</div>
	)
}

export const getStaticProps = async ({locale}: {locale: string}) => {
	return {
		props: {
			messages: (await import(`../localization/${locale}.json`)) as string,
		},
	}
}
