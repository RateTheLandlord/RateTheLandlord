import Alert from '@/components/alerts/Alert'
import Modal from '@/components/modal/Modal'
import ToggleSwitch from '@/components/ui/toggleswitch'
import {Review} from '@/util/interfaces'
import {useEffect, useState} from 'react'
import useSWR, {useSWRConfig} from 'swr'
import EditReviewModal from '../components/EditReviewModal'
import RemoveReviewModal from '../components/RemoveReviewModal'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const FlaggedReviews = () => {
	const {mutate} = useSWRConfig()
	const [editReviewOpen, setEditReviewOpen] = useState(false)
	const [selectedReview, setSelectedReview] = useState<Review | undefined>()
	const [newReview, setNewReview] = useState('')

	const [flaggedReviews, setFlaggedReviews] = useState<Array<Review>>([])

	const [removeReviewOpen, setRemoveReviewOpen] = useState(false)
	const [success, setSuccess] = useState(false)
	const [removeAlertOpen, setRemoveAlertOpen] = useState(false)

	const [showApproved, setShowApproved] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {data: reviews, error} = useSWR<Array<Review>>(
		'/api/get-flagged',
		fetcher,
	)

	useEffect(() => {
		if (reviews) {
			if (showApproved) {
				setFlaggedReviews([...reviews])
			} else {
				setFlaggedReviews(() => {
					return reviews.filter(
						(review) =>
							review.admin_approved === false || review.admin_approved === null,
					)
				})
			}
		}
	}, [reviews, showApproved])

	if (error) return <div>failed to load</div>
	if (!reviews) return <div>loading...</div>

	const onSubmitRemoveReview = (id: number) => {
		fetch('/api/delete-review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({id: id}),
		})
			.then((result) => {
				if (!result.ok) {
					throw new Error()
				}
			})
			.then(() => {
				mutate('/api/get-flagged').catch((err) => console.log(err))
				setRemoveReviewOpen(false)
				setSuccess(true)
				setRemoveAlertOpen(true)
			})
			.catch((err) => {
				console.log(err)
				setRemoveAlertOpen(false)
				setSuccess(false)
				setRemoveAlertOpen(true)
			})
	}

	const onSubmitEditReview = (id?: number) => {
		const editedReview = {
			...selectedReview,
			review: newReview,
			admin_edited: true,
			admin_approved: true,
		}
		fetch('/api/edit-review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(editedReview),
		})
			.then((result) => {
				if (!result.ok) {
					throw new Error()
				}
			})
			.then(() => {
				mutate('/api/get-flagged').catch((err) => console.log(err))
				setEditReviewOpen(false)
				setSuccess(true)
				setRemoveAlertOpen(true)
			})
			.catch((err) => {
				console.log(err)
				setSuccess(false)
				setRemoveAlertOpen(true)
			})
	}

	const onSubmitApproveReview = (id?: number) => {
		const editedReview = {
			...selectedReview,
			admin_approved: true,
		}
		fetch('/api/edit-review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(editedReview),
		})
			.then((result) => {
				if (!result.ok) {
					throw new Error()
				}
			})
			.then(() => {
				mutate('/api/get-flagged').catch((err) => console.log(err))
				setSuccess(true)
				setRemoveAlertOpen(true)
			})
			.catch((err) => {
				console.log(err)
				setSuccess(false)
				setRemoveAlertOpen(true)
			})
	}

	return (
		<div className="w-full flex flex-wrap justify-center px-4 sm:px-6 lg:px-8 container">
			{removeAlertOpen ? (
				<div className="w-full">
					<Alert success={success} setAlertOpen={setRemoveAlertOpen} />
				</div>
			) : null}
			{selectedReview ? (
				<>
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
						selectedId={selectedReview?.id}
						buttonColour="blue"
					/>
					<Modal
						title="Remove Review"
						open={removeReviewOpen}
						setOpen={setRemoveReviewOpen}
						element={<RemoveReviewModal />}
						onSubmit={onSubmitRemoveReview}
						buttonColour="red"
						selectedId={selectedReview?.id}
					/>
				</>
			) : null}
			<div className="w-full flex justify-end container py-4">
				<h5 className="px-2">Show Approved: </h5>
				<ToggleSwitch enabled={showApproved} setEnabled={setShowApproved} />
			</div>
			<div className="-mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg container">
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
						{flaggedReviews.map((review) => (
							<tr
								key={review.landlord}
								className={`${review.admin_approved ? 'bg-green-100' : ''}`}
							>
								<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
									{review.landlord}
									<dl className="font-normal lg:hidden">
										<dt className="sr-only">Reason</dt>
										<dd className="mt-1 truncate text-gray-500">
											{review.flagged_reason}
										</dd>
										<dt className="sr-only sm:hidden">Review</dt>
										<dd className="mt-1 truncate text-gray-700 sm:hidden">
											{review.review}
										</dd>
									</dl>
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
									{review.flagged_reason}
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
									{review.review}
								</td>
								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									{review.admin_approved ? null : (
										<button
											onClick={() => {
												setSelectedReview(review)
												onSubmitApproveReview(review.id)
											}}
											className="text-indigo-600 hover:text-indigo-900"
										>
											Approve
										</button>
									)}
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
											setSelectedReview(review)
											setRemoveReviewOpen((p) => !p)
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
