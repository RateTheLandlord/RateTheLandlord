/* eslint-disable no-mixed-spaces-and-tabs */
import {Review} from '@/util/interfaces/interfaces'
import {Dispatch, Fragment, SetStateAction} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {mutate} from 'swr'
import XIcon from '@heroicons/react/outline/XIcon'

interface IProps {
	selectedReview: Review | undefined
	mutateString: string
	setRemoveReviewOpen: Dispatch<SetStateAction<boolean>>
	setSuccess: Dispatch<SetStateAction<boolean>>
	setRemoveAlertOpen: Dispatch<SetStateAction<boolean>>
	removeReviewOpen: boolean
	setSelectedReview: Dispatch<SetStateAction<Review | undefined>>
}

const RemoveReviewModal = ({
	selectedReview,
	mutateString,
	setRemoveReviewOpen,
	setSuccess,
	setRemoveAlertOpen,
	removeReviewOpen,
	setSelectedReview,
}: IProps) => {
	const onSubmitRemoveReview = () => {
		if (selectedReview) {
			fetch('/api/delete-review', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({id: selectedReview.id}),
			})
				.then((result) => {
					if (!result.ok) {
						throw new Error()
					}
				})
				.then(() => {
					mutate(mutateString).catch((err) => console.log(err))
					setRemoveReviewOpen(false)
					setSuccess(true)
					setRemoveAlertOpen(true)
					setSelectedReview(undefined)
				})
				.catch((err) => {
					console.log(err)
					setRemoveAlertOpen(false)
					setSuccess(false)
					setRemoveAlertOpen(true)
					setSelectedReview(undefined)
				})
		}
	}

	return (
		<Transition.Root show={removeReviewOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setRemoveReviewOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										onClick={() => setRemoveReviewOpen(false)}
									>
										<span className="sr-only">Close</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											Remove Review
										</Dialog.Title>
									</div>
								</div>
								<div>
									<div className="ml-4" data-testid="remove-review-modal-1">
										<h2>
											Are you sure you want to remove this review? This cannot
											be undone.
										</h2>
									</div>
								</div>
								<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
									<button
										type="button"
										className={`hover:bg-red:700 inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
										onClick={() => onSubmitRemoveReview()}
									>
										Remove
									</button>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
										onClick={() => {
											setSelectedReview(undefined)
											setRemoveReviewOpen(false)
										}}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default RemoveReviewModal
