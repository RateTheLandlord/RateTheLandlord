import ProfanityModal from '@/components/create-review/profanity-modal'
import ReviewForm from '@/components/create-review/review-form'
import React, {useState} from 'react'

//This page should be statically generated at build. No need for data fetching here.

function CreateReview(): JSX.Element {
	const [profanityModalOpen, setProfanityModalOpen] = useState<boolean>(false)
	return (
		<div>
			<ProfanityModal
				isOpen={profanityModalOpen}
				setIsOpen={setProfanityModalOpen}
			/>
			<div className="w-full">
				<h1 className="text-4xl font-extrabold border-b-teal-600 border-b-2">
					Enter your Review
				</h1>
			</div>
			<div className="w-full">
				<ReviewForm setProfanityModalOpen={setProfanityModalOpen} />
			</div>
		</div>
	)
}

export default CreateReview
