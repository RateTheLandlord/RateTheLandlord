import React, {SetStateAction} from 'react'
import {Dialog} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'

// TODO Styling

function ProfanityModal({
	isOpen,
	setIsOpen,
	onSubmit,
}: {
	isOpen: boolean
	setIsOpen: React.Dispatch<SetStateAction<boolean>>
	onSubmit: () => void
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
					<Dialog.Title className="text-xl font-bold mb-2 text-center">
						Profanity Alert
					</Dialog.Title>

					<p className="mb-2 text-center">
						Are you sure you want to submit your review with profanity? If it is
						found to be vulgar your review may be edited or removed
					</p>
					<p className="mb-4 text-center">
						It is possible our profanity sensor was triggered incorrectly. If
						you think this is the case then feel free to submit your review!
					</p>

					<div className="flex w-full justify-between">
						<ButtonLight
							onClick={() => {
								setIsOpen(false)
								onSubmit()
							}}
						>
							Submit Anyways
						</ButtonLight>
						<Button onClick={() => setIsOpen(false)}>Edit</Button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default ProfanityModal
