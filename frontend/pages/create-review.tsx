import Alert from '@/components/alerts/Alert'
import ProfanityModal from '@/components/create-review/profanity-modal'
import ReviewForm from '@/components/create-review/review-form'
import SuccessModal from '@/components/create-review/success-modal'
import React, {useState} from 'react'

//This page should be statically generated at build. No need for data fetching here.

function CreateReview(): JSX.Element {
	const [profanityModalOpen, setProfanityModalOpen] = useState<boolean>(false)
	const [success, setSuccess] = useState(false)
	const [alertOpen, setAlertOpen] = useState(false)
	const [successModalOpen, setSuccessModalOpen] = useState(false)
	return (
		<div>
			{alertOpen ? (
				<Alert success={success} setAlertOpen={setAlertOpen} />
			) : null}
			<SuccessModal isOpen={successModalOpen} setIsOpen={setSuccessModalOpen} />
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
				<ReviewForm
					setProfanityModalOpen={setProfanityModalOpen}
					setSuccess={setSuccess}
					setAlertOpen={setAlertOpen}
					setSuccessModalOpen={setSuccessModalOpen}
				/>
			</div>
		</div>
	)
}

export default CreateReview
