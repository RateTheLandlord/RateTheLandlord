import React, {SetStateAction, useState} from 'react'
import {Dialog} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'
import {Review} from '@/util/interfaces'
import {useTranslation} from 'react-i18next'

function ReportModal({
	isOpen,
	setIsOpen,
	selectedReview,
}: {
	isOpen: boolean
	setIsOpen: React.Dispatch<SetStateAction<boolean>>
	selectedReview: Review | undefined
}) {
	const {t} = useTranslation('reviews')
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
			onClose={() => {
				setReason('')
				setSubmitSuccess(false)
				setSubmitError(false)
				setIsOpen(false)
			}}
		>
			<div
				className="fixed inset-0 bg-black/30"
				aria-hidden="true"
				data-testid="report-modal-1"
			/>
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-sm rounded-md bg-white p-10">
					{submitError ? (
						<p className="text-red-400">{t('reviews.report.error')}</p>
					) : null}
					{submitSuccess ? (
						<Dialog.Title>{t('reviews.report.success')}</Dialog.Title>
					) : null}
					{!submitError && !submitSuccess ? (
						<>
							<Dialog.Title>{t('reviews.report.report')}</Dialog.Title>
							<Dialog.Description>
								{t('reviews.report.description')}
							</Dialog.Description>

							<div className="mb-3">
								<label
									htmlFor="report"
									className="block text-sm font-medium text-gray-700"
								>
									{t('reviews.report.reason')}
								</label>
								<div className="mt-1">
									<textarea
										rows={4}
										name="report"
										id="report"
										onChange={(e) => setReason(e.target.value)}
										className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										placeholder="Write your reasoning here..."
									/>
								</div>
							</div>

							<ButtonLight
								onClick={() => setIsOpen(false)}
								data-umami-event="Report Cancelled"
							>
								{t('reviews.report.cancel')}
							</ButtonLight>
							<Button
								onClick={() => handleSubmit()}
								data-umami-event="Report Submitted"
							>
								{t('reviews.report.submit')}
							</Button>
						</>
					) : null}
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default ReportModal
