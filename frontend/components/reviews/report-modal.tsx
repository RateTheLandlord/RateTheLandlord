import React, {SetStateAction, useState} from 'react'
import {Dialog} from '@headlessui/react'
import ButtonLight from '../ui/button-light'
import Button from '../ui/button'
import {Review} from '@/util/interfaces'
import {useTranslation} from 'react-i18next'
import HCaptcha from '@hcaptcha/react-hcaptcha'

interface IProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<SetStateAction<boolean>>
	selectedReview: Review | undefined
}

interface IReportReason {
	id: number
	key: string
	reason: string
}

const siteKey = process.env.NEXT_PUBLIC_HCPATCHA_SITE_KEY as string

const reportReasons: Array<IReportReason> = [
	{
		id: 1,
		key: 'address',
		reason: 'Address is in the review',
	},
	{
		id: 3,
		key: 'fake',
		reason: 'Fake Review',
	},
	{
		id: 4,
		key: 'language',
		reason: 'Review contains inappropriate language',
	},
	{
		id: 5,
		key: 'sensitive',
		reason: 'This review contains sensitive information',
	},
	{
		id: 8,
		key: 'other',
		reason: 'Other',
	},
]

function ReportModal({isOpen, setIsOpen, selectedReview}: IProps) {
	const {t} = useTranslation('reviews')
	const [reason, setReason] = useState<string>(reportReasons[0].reason)
	const [selectedReason, setSelectedReason] = useState<IReportReason>(
		reportReasons[0],
	)

	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState(false)
	const [token, setToken] = useState<string>('')

	const handleSubmit = () => {
		if (selectedReview) {
			fetch(`/api/flag-review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: selectedReview.id,
					captchaToken: token,
					flagged_reason: reason,
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

	const onVerifyCaptcha = (token: string) => {
		setToken(token)
	}

	return (
		<Dialog
			className="relative z-50"
			open={isOpen}
			onClose={() => {
				setReason(reportReasons[0].reason)
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
						<div className="flex w-full flex-col items-center gap-4">
							<Dialog.Title className="text-red-400">
								{t('reviews.report.error')}
							</Dialog.Title>
							<div className="flex w-full justify-end">
								<ButtonLight
									onClick={() => {
										setReason(reportReasons[0].reason)
										setSubmitSuccess(false)
										setSubmitError(false)
										setIsOpen(false)
									}}
								>
									Close
								</ButtonLight>
							</div>
						</div>
					) : null}
					{submitSuccess ? (
						<div className="flex w-full flex-col items-center gap-4">
							<Dialog.Title>{t('reviews.report.success')}</Dialog.Title>
							<div className="flex w-full justify-end">
								<ButtonLight
									onClick={() => {
										setReason(reportReasons[0].reason)
										setSubmitSuccess(false)
										setSubmitError(false)
										setIsOpen(false)
									}}
								>
									Close
								</ButtonLight>
							</div>
						</div>
					) : null}
					{!submitError && !submitSuccess ? (
						<>
							<Dialog.Title className="mb-2 text-center text-xl">
								{t('reviews.report.report')}
							</Dialog.Title>
							<Dialog.Description className="text-sm">
								{t('reviews.report.description')}
							</Dialog.Description>

							<div className="mb-3">
								<label
									htmlFor="reason"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Select a reason
								</label>
								<select
									id="reason"
									name="reason"
									className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
									defaultValue={reason}
									onChange={(e) => {
										const selected: Array<IReportReason> = reportReasons.filter(
											(reason: IReportReason) => reason.key === e.target.value,
										)
										setSelectedReason(selected[0])
										setReason(selected[0].reason)
									}}
								>
									{reportReasons.map((reason) => {
										return (
											<option key={reason.id} value={reason.key}>
												{reason.reason}
											</option>
										)
									})}
								</select>
							</div>

							{selectedReason.key === 'other' ? (
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
											onChange={(e) =>
												setReason(`${selectedReason.reason}: ${e.target.value}`)
											}
											className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											placeholder="Write your reasoning here..."
										/>
										<p
											className={`text-xs ${
												reason.length >= 255 ? 'text-red-400' : 'text-black'
											}`}
										>
											Limit of 250 Characters: {reason.length - 5}/250
										</p>
									</div>
								</div>
							) : null}

							<div className="mb-2 flex justify-center">
								<HCaptcha sitekey={siteKey} onVerify={onVerifyCaptcha} />
							</div>

							<div className="flex flex-row justify-end">
								<ButtonLight
									onClick={() => {
										setSelectedReason(reportReasons[0])
										setReason(reportReasons[0].reason)
										setIsOpen(false)
									}}
									data-umami-event="Report Cancelled"
								>
									{t('reviews.report.cancel')}
								</ButtonLight>
								<Button
									onClick={() => handleSubmit()}
									data-umami-event="Report Submitted"
									disabled={!token || reason.length >= 255}
								>
									{t('reviews.report.submit')}
								</Button>
							</div>
						</>
					) : null}
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}

export default ReportModal
