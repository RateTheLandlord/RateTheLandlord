import React, {SetStateAction} from 'react'
import {Dialog} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'

// TODO Styling
// TODO handle Report Submit (PUT request to update review to include flaggedReason and set flagged = true)

function ReportModal({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean
	setIsOpen: React.Dispatch<SetStateAction<boolean>>
}) {
	return (
		<Dialog
			className="relative z-50"
			open={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-sm rounded-md bg-white p-10">
					<Dialog.Title>Report Review</Dialog.Title>
					<Dialog.Description>
						Think this review should be removed or altered?
					</Dialog.Description>

					<div>
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
								// onChange={}
								className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								defaultValue={'Write your reasoning here...'}
							/>
						</div>
					</div>

					<ButtonLight onClick={() => setIsOpen(false)}>Cancel</ButtonLight>
					<Button onClick={() => setIsOpen(false)}>Submit</Button>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default ReportModal
