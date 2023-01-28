import Modal from '@/components/modal/Modal'
import {useState} from 'react'
import EditReviewModal from '../components/EditReviewModal'
import RemoveReviewModal from '../components/RemoveReviewModal'

// TODO Add Approve Function
// TODO Hook up to BE
// TODO Add Success/Failure Notification

interface IReview {
	landlord: string
	review: string
	reason: string
}

const reviews = [
	{
		landlord: 'Lindsay Walton',
		review: 'Test Review',
		reason: 'Profanity',
	},
]

const FlaggedReviews = () => {
	const [editReviewOpen, setEditReviewOpen] = useState(false)
	const [selectedReview, setSelectedReview] = useState<IReview | undefined>()
	const [newReview, setNewReview] = useState('')

	const [removeReviewOpen, setRemoveReviewOpen] = useState(false)

	const onSubmitRemoveReview = () => {
		console.log('Remove Review Submitted')
	}

	const onSubmitEditReview = () => {
		console.log('Edit Review Submit')
		console.log(newReview)
	}
	return (
		<div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
			<Modal
				title="Edit Review"
				open={editReviewOpen}
				setOpen={setEditReviewOpen}
				element={
					<EditReviewModal
						review={selectedReview?.review}
						setReview={setNewReview}
					/>
				}
				onSubmit={onSubmitEditReview}
				buttonColour="blue"
			/>
			<Modal
				title="Remove Review"
				open={removeReviewOpen}
				setOpen={setRemoveReviewOpen}
				element={<RemoveReviewModal />}
				onSubmit={onSubmitRemoveReview}
				buttonColour="red"
			/>
			<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg container">
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
							>
								Landlord
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Reason
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
							>
								Review
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Approve</span>
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Edit</span>
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Remove</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{reviews.map((review) => (
							<tr key={review.landlord}>
								<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
									{review.landlord}
									<dl className="font-normal lg:hidden">
										<dt className="sr-only">Reason</dt>
										<dd className="mt-1 truncate text-gray-500">
											{review.reason}
										</dd>
										<dt className="sr-only sm:hidden">Review</dt>
										<dd className="mt-1 truncate text-gray-700 sm:hidden">
											{review.review}
										</dd>
									</dl>
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
									{review.reason}
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
									{review.review}
								</td>
								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Approve
									</a>
								</td>
								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									<button
										onClick={() => {
											setSelectedReview(review)
											setEditReviewOpen(true)
										}}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Edit
									</button>
								</td>
								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									<button
										onClick={() => {
											setRemoveReviewOpen((p) => !p)
											setSelectedReview(review)
										}}
										className="text-indigo-600 hover:text-indigo-900"
									>
										Remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default FlaggedReviews
