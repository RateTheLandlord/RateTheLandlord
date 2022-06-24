import ReviewFilters from '@/Components/Reviews/ReviewFilters'
import ReviewTable from '@/Components/Reviews/ReviewTable'
import React from 'react'

//This page should be statically generated for better SEO performance with getStaticProps through NextJS with a short regeneration period (30 minute?)
//Once the page is loaded, though, SWR should be used to get up-to-date reviews
//Data passed to Review Filters and Review Table

function Reviews(): JSX.Element {
	return (
		<div>
			Reviews
			<ReviewFilters />
			<ReviewTable />
		</div>
	)
}

export default Reviews
