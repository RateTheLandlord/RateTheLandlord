import React, {SetStateAction, useState} from 'react'
import {Dialog} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'
import {Review} from '@/util/interfaces'

// TODO Styling
// TODO handle Report Submit (PUT request to update review to include flagged_reason and set flagged = true)

function ReportModal({
	isOpen,
	setIsOpen,
	selectedReview,
}: {
	isOpen: boolean
	setIsOpen: React.Dispatch<SetStateAction<boolean>>
	selectedReview: Review | undefined
}) {
	const [reason, setReason] = useState<string>('')

	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState(false)

	const handleSubmit = () => {
		if (selectedReview) {
			const newReview: Review = {
				...selectedReview,
				flagged: true,
				flagged_reason: reason,
			}
			fetch(`/api/flag-review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					newReview,
				}),
			})
				.then((result: Response) => {
					if (!result.ok) {
						throw new Error()
					} else {
						return result.json()
					}
				})
				.then(() => {
					setSubmitSuccess(true)
				})
				.catch(() => {
					setSubmitError(false)
				})
		}
	}
	return (
		<Dialog
			className="relative z-50"
			open={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-sm rounded-md bg-white p-10">
					{submitError ? (
						<p className="text-red-400">Error, please try again</p>
					) : null}
					{submitSuccess ? <Dialog.Title>Report Received!</Dialog.Title> : null}
					{!submitError && !submitSuccess ? (
						<>
							<Dialog.Title>Report Review</Dialog.Title>
							<Dialog.Description>
								Think this review should be removed or altered?
							</Dialog.Description>

							<div className="mb-3">
								<label
									htmlFor="report"
									className="block text-sm font-medium text-gray-700"
								>
									Reason
								</label>
								<div className="mt-1">
									<textarea
										rows={4}
										name="report"
										id="report"
										onChange={(e) => setReason(e.target.value)}
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
										placeholder="Write your reasoning here..."
									/>
								</div>
							</div>

							<ButtonLight onClick={() => setIsOpen(false)}>Cancel</ButtonLight>
							<Button onClick={() => handleSubmit()}>Submit</Button>
						</>
					) : null}
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default ReportModal
