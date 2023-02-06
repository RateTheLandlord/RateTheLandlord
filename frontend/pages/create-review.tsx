import ReviewForm from '@/components/create-review/review-form'
import Head from 'next/head'
import React from 'react'

//This page should be statically generated at build. No need for data fetching here.

function CreateReview(): JSX.Element {
	return (
		<div className="w-full flex justify-center">
			<Head>
				<title>Create a Review | Rate The Landlord</title>
			</Head>
			<ReviewForm />
		</div>
	)
}

export default CreateReview
