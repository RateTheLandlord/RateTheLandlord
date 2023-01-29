import React, {SetStateAction} from 'react'
import {Dialog} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'
import {useRouter} from 'next/router'

// TODO Styling

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
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-sm rounded-md bg-white p-10">
					<Dialog.Title>Review Submitted Successfully!</Dialog.Title>

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
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default SuccessModal
