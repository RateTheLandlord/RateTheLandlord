import React, {SetStateAction} from 'react'
import {Dialog} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'
import {useRouter} from 'next/router'

function SuccessModal({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean
	setIsOpen: React.Dispatch<SetStateAction<boolean>>
}) {
	const router = useRouter()
	return (
		<Dialog
			className="relative z-50"
			open={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex flex-col items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-sm rounded-md bg-white p-10 flex flex-col">
					<Dialog.Title className="mb-4 w-full flex justify-center">
						Review Submitted Successfully!
					</Dialog.Title>

					<div className="flex flex-row gap-2">
						<ButtonLight
							onClick={() => {
								setIsOpen(false)
								router.reload()
							}}
						>
							Submit Another Review
						</ButtonLight>
						<Button
							onClick={() => {
								setIsOpen(false)
								router.push('/reviews').catch((err) => console.log(err))
							}}
						>
							Go To Reviews
						</Button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default SuccessModal
