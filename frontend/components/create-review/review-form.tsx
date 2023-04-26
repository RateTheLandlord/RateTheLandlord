/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useState} from 'react'
import Button from '../ui/button'
import ButtonLight from '../ui/button-light'
import RatingsRadio from './ratings-radio'
import countries from '@/util/countries.json'
import provinces from '@/util/provinces.json'
import regions from '@/util/regions.json'
import states from '@/util/states.json'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import {useTranslation} from 'react-i18next'
import Alert from '../alerts/Alert'
import MaliciousStringAlert from '../alerts/MaliciousStringAlert'
import SuccessModal from './success-modal'
import {postcodeValidator} from 'postcode-validator'
import AddReviewModal from './add-review-modal'

//This components will hold the review form and it's data handling logic
//Completed reviews should be sent to the backend with a success confirmation for the user (maybe need a Modal?)
//Once completed, it should give an option to reset the form for another review or direct Client to Reviews page

const country_codes = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US' || c === 'GB',
)

const siteKey = process.env.NEXT_PUBLIC_HCPATCHA_SITE_KEY as string

function ReviewForm(): JSX.Element {
	const {t} = useTranslation('create')

	const [success, setSuccess] = useState(false)
	const [alertOpen, setAlertOpen] = useState(false)
	const [maliciousAlertOpen, setMaliciousAlertOpen] = useState(false)
	const [successModalOpen, setSuccessModalOpen] = useState(false)
	const [reviewModalOpen, setReviewModalOpen] = useState(false)

	const [landlord, setLandlord] = useState<string>('')
	const [country, setCountry] = useState<string>('CA')
	const [city, setCity] = useState<string>('')
	const [province, setProvince] = useState<string>('Alberta')
	const [postal, setPostal] = useState<string>('')

	const [repair, setRepair] = useState<number>(3)
	const [health, setHealth] = useState<number>(3)
	const [stability, setStability] = useState<number>(3)
	const [privacy, setPrivacy] = useState<number>(3)
	const [respect, setRespect] = useState<number>(3)
	const [review, setReview] = useState<string>('')

	const [disclaimer, setDisclaimer] = useState(false)
	const [token, setToken] = useState<string>('')

	const [postalError, setPostalError] = useState(false)

	// Additional state for disabling submit
	const [maliciousStringDetected, setMaliciousStringDetected] = useState(false)

	// Malicious string check
	const detectMaliciousString = (stringToCheck: string): boolean => {
		const maliciousPatterns = /<script>|http|\p{Extended_Pictographic}/giu
		const hasMaliciousPatterns = maliciousPatterns.test(stringToCheck)

		return hasMaliciousPatterns
	}

	// Updated text change handler with malicious string check
	const handleTextChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		inputName: string,
	) => {
		const stringIsMalicious = detectMaliciousString(e.target.value)

		switch (inputName) {
			case 'landlord':
				if (stringIsMalicious) {
					setMaliciousStringDetected(true)
					console.log('Malicious!')
					setMaliciousAlertOpen(true)
					setLandlord('')
					e.target.value = ''
				} else {
					setLandlord(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
			case 'city':
				if (stringIsMalicious) {
					setMaliciousStringDetected(true)
					console.log('Malicious!')
					setMaliciousAlertOpen(true)
					setCity('')
					e.target.value = ''
				} else {
					setCity(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
			case 'postal':
				if (stringIsMalicious) {
					setMaliciousStringDetected(true)
					console.log('Malicious!')
					setMaliciousAlertOpen(true)
					setPostal('')
					e.target.value = ''
				} else {
					setPostal(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
			case 'review':
				if (stringIsMalicious) {
					setMaliciousStringDetected(true)
					console.log('Malicious!')
					setMaliciousAlertOpen(true)
					setReview('')
					e.target.value = ''
				} else {
					setReview(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
		}
	}

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		if (review.trim().length < 1) {
			setReviewModalOpen(true)
		} else {
			if (postcodeValidator(postal, country)) {
				fetch(`/api/submit-review`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						captchaToken: token,
						review: {
							landlord: landlord.trim(),
							country_code: country,
							city: city.trim(),
							state: province,
							zip: postal.trim(),
							review: review.trim(),
							repair: repair,
							health: health,
							stability: stability,
							privacy: privacy,
							respect: respect,
							flagged: false,
							flagged_reason: '',
							admin_approved: false,
							admin_edited: false,
						},
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
						setSuccessModalOpen(true)
					})
					.catch(() => {
						setSuccess(false)
						setAlertOpen(true)
					})
			} else {
				setPostalError(true)
			}
		}
	}

	const onVerifyCaptcha = (token: string) => {
		setToken(token)
	}

	useEffect(() => {
		if (country === 'GB') {
			setProvince('England')
		}
	}, [country])

	return (
		<div
			className="container flex w-full flex-col items-center px-4 sm:px-0"
			data-testid="create-review-form-1"
		>
			{alertOpen ? (
				<Alert success={success} setAlertOpen={setAlertOpen} />
			) : null}
			{maliciousAlertOpen ? (
				<MaliciousStringAlert setMaliciousAlertOpen={setMaliciousAlertOpen} />
			) : null}
			<SuccessModal isOpen={successModalOpen} setIsOpen={setSuccessModalOpen} />
			<AddReviewModal isOpen={reviewModalOpen} setIsOpen={setReviewModalOpen} />
			<div className="my-3 w-full">
				<h1 className="border-b-2 border-b-teal-600 text-4xl font-extrabold">
					{t('create-review.review-form.header')}
				</h1>
			</div>
			<form
				onSubmit={handleSubmit}
				className="w-full space-y-8 divide-y divide-gray-200"
			>
				<div className="space-y-8 divide-y divide-gray-200">
					<div className="pt-8">
						<div>
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								{t('create-review.review-form.title')}
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								{t('create-review.review-form.sub')}
							</p>
						</div>
						<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="landlord"
									className="block text-sm font-medium text-gray-700"
								>
									{t('create-review.review-form.landlord')}
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="landlord"
										id="landlord"
										required
										placeholder={t('create-review.review-form.landlord')}
										onChange={(e) => handleTextChange(e, 'landlord')}
										className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										data-testid="create-review-form-landlord-1"
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700"
								>
									{t('create-review.review-form.country')}
								</label>
								<div className="mt-1">
									<select
										id="country"
										name="country"
										required
										onChange={(e) => setCountry(e.target.value)}
										className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										{country_codes.map((country) => {
											return (
												<option key={country} value={country}>
													{countries[country]}
												</option>
											)
										})}
									</select>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700"
								>
									{t('create-review.review-form.city')}
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="city"
										id="city"
										placeholder={t('create-review.review-form.city')}
										required
										onChange={(e) => handleTextChange(e, 'city')}
										className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										data-testid="create-review-form-city-1"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium text-gray-700"
								>
									{country === 'GB'
										? t('create-review.review-form.region')
										: t('create-review.review-form.state')}
								</label>
								<div className="mt-1">
									<select
										id="region"
										name="region"
										required
										onChange={(e) => setProvince(e.target.value)}
										className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										{country === 'CA'
											? provinces.map((province) => {
													return (
														<option key={province.short} value={province.name}>
															{province.name}
														</option>
													)
											  })
											: country === 'GB'
											? regions.map((region) => {
													return (
														<option key={region.short} value={region.name}>
															{region.name}
														</option>
													)
											  })
											: states.map((state) => {
													return (
														<option key={state.short} value={state.name}>
															{state.name}
														</option>
													)
											  })}
									</select>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="postal-code"
									className="block text-sm font-medium text-gray-700"
								>
									{t('create-review.review-form.zip')}
								</label>
								<div className="mt-1">
									<input
										type="text"
										name="postal-code"
										id="postal-code"
										placeholder={t('create-review.review-form.zip')}
										required
										onChange={(e) => handleTextChange(e, 'postal')}
										className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
											postalError ? 'border-red-400' : ''
										}`}
										data-testid="create-review-form-postal-code-1"
									/>
								</div>
								{postalError ? (
									<p className="text-xs text-red-400">
										{t('create-review.review-form.postal-error')}
									</p>
								) : null}
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="mt-2 text-lg font-medium leading-6 text-gray-900">
							{t('create-review.review-form.rate-title')}
						</h3>
						<RatingsRadio
							title={t('create-review.review-form.repair')}
							rating={repair}
							setRating={setRepair}
							tooltip={t('create-review.review-form.repair_description')}
						/>

						<RatingsRadio
							title={t('create-review.review-form.health')}
							rating={health}
							setRating={setHealth}
							tooltip={t('create-review.review-form.health_description')}
						/>

						<RatingsRadio
							title={t('create-review.review-form.stability')}
							rating={stability}
							setRating={setStability}
							tooltip={t('create-review.review-form.stability_description')}
						/>

						<RatingsRadio
							title={t('create-review.review-form.privacy')}
							rating={privacy}
							setRating={setPrivacy}
							tooltip={t('create-review.review-form.privacy_description')}
						/>

						<RatingsRadio
							title={t('create-review.review-form.respect')}
							rating={respect}
							setRating={setRespect}
							tooltip={t('create-review.review-form.respect_description')}
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor="comment"
						className="mt-2 block text-sm font-medium text-gray-700"
					>
						{t('create-review.review-form.review')}
					</label>
					<div className="mt-1">
						<textarea
							rows={4}
							name="comment"
							id="comment"
							onChange={(e) => handleTextChange(e, 'review')}
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							defaultValue={''}
							data-testid="create-review-form-text-1"
						/>
					</div>
				</div>

				<div className="py-5">
					<div className="mb-2 flex justify-center space-x-2">
						<div className="flex h-5 items-center">
							<input
								id="terms"
								name="terms"
								type="checkbox"
								checked={disclaimer}
								onChange={() => setDisclaimer((p) => !p)}
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
						</div>
						<label htmlFor="terms" className="text-sm text-gray-500">
							I understand that posting a review on Rate The Landlord is public
							and can be viewed by anyone. Rate The Landlord reserves the right
							to modify reviews if they break our review standards or rules. I
							also understand that Rate The Landlord is not responsible for any
							consequences as a result of posting my review and that while the
							review is anonymous, it may still be linked back to me. Finally, I
							understand that Rate The Landlord recommends leaving a review
							after my tenancy is over and that doing otherwise is my decision.
						</label>
					</div>

					<div
						data-testid="create-review-form-captcha-1"
						className="mb-2 flex justify-center"
					>
						<HCaptcha sitekey={siteKey} onVerify={onVerifyCaptcha} />
					</div>

					<div
						className="flex justify-center sm:justify-end"
						data-testid="create-review-form-submit-button-1"
					>
						<ButtonLight data-umami-event="Create Review Form Reset">
							{t('create-review.review-form.reset')}
						</ButtonLight>
						<Button
							disabled={!token || !disclaimer || maliciousStringDetected}
							data-umami-event="Review Submitted"
						>
							{t('create-review.review-form.submit')}
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ReviewForm
