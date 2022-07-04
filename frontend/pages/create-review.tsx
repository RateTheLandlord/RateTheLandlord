import ReviewForm from '@/components/create-review/review-form'
import React from 'react'

//This page should be statically generated at build. No need for data fetching here.

function CreateReview(): JSX.Element {
	return (
		<div>
			<div className="w-full">
				<h1 className="text-4xl font-extrabold border-b-teal-600 border-b-2">
					Enter your Review
				</h1>
			</div>
			<div className="w-full">
				<ReviewForm />
			</div>
		</div>
	)
}

export default CreateReview
