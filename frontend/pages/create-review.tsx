import Faq from '@/components/about/faq'
import ReviewForm from '@/components/create-review/review-form'
import Head from 'next/head'
import React from 'react'

function CreateReview(): JSX.Element {
	return (
		<div className="w-full flex justify-center" data-testid="create-review-form-1">
			<Head>
				<title>Create a Review | Rate The Landlord</title>
			</Head>
			<div className="flex flex-col">
				<ReviewForm />
				<Faq />
			</div>
		</div>
	)
}

export default CreateReview
