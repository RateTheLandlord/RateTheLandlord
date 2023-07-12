import React, {SetStateAction, Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'
import {useRouter} from 'next/router'
import {useTranslation} from 'react-i18next'

interface IProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

function SuccessModal({isOpen, setIsOpen}: IProps) {
	const {t} = useTranslation('create')
	const router = useRouter()
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog data-testid="success-modal-1" as="div" className="relative z-10" onClose={setIsOpen}>
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

				<div data-testid="success-modal-2" className="fixed inset-0 z-10 overflow-y-auto">
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
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div>
									<div className="mt-3 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-base font-semibold leading-6 text-gray-900"
										>
											{t('create-review.modal.success')}
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												{t('create-review.modal.description')}
											</p>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
									<ButtonLight
										umami="Success Modal / Submit Another Button"
										onClick={() => {
											setIsOpen(false)
											router.reload()
										}}
									>
										{t('create-review.modal.submit-another')}
									</ButtonLight>
									<Button
										umami="Success Modal / Go to Reviews Button"
										onClick={() => {
											setIsOpen(false)
											router.push('/reviews').catch((err) => console.log(err))
										}}
									>
										{t('create-review.modal.go-to')}
									</Button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default SuccessModal
