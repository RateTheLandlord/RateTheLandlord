/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useState} from 'react'

import AddReviewModal from './add-review-modal'
import Alert from '../alerts/Alert'
import Button from '../ui/button'
import ButtonLight from '../ui/button-light'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import MaliciousStringAlert from '../alerts/MaliciousStringAlert'
import RatingsRadio from './ratings-radio'
import SuccessModal from './success-modal'
import countries from '@/util/countries/countries.json'
import {postcodeValidator} from 'postcode-validator'
import provinces from '@/util/countries/canada/provinces.json'
import regions from '@/util/countries/unitedKingdom/regions.json'
import states from '@/util/countries/unitedStates/states.json'
import territories from '@/util/countries/australia/territories.json'
import nz_provinces from '@/util/countries/newZealand/nz-provinces.json'
import {useTranslation} from 'react-i18next'
import {country_codes} from '@/util/helpers/getCountryCodes'

//This components will hold the review form and it's data handling logic
//Completed reviews should be sent to the backend with a success confirmation for the user (maybe need a Modal?)
//Once completed, it should give an option to reset the form for another review or direct Client to Reviews page

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

	const [disclaimerOne, setDisclaimerOne] = useState(false)
	const [disclaimerTwo, setDisclaimerTwo] = useState(false)
	const [disclaimerThree, setDisclaimerThree] = useState(false)
	const [token, setToken] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

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
					setMaliciousAlertOpen(true)
				} else {
					setLandlord(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
			case 'city':
				if (stringIsMalicious) {
					setMaliciousStringDetected(true)
					setMaliciousAlertOpen(true)
				} else {
					setCity(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
			case 'postal':
				if (stringIsMalicious) {
					setMaliciousStringDetected(true)
					setMaliciousAlertOpen(true)
				} else {
					setPostal(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
			case 'review':
				if (stringIsMalicious) {
					setMaliciousStringDetected(true)
					setMaliciousAlertOpen(true)
				} else {
					setReview(e.target.value)
					setMaliciousStringDetected(false)
				}
				break
		}
	}

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		setLoading(true)
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
					.finally(() => {
						setLoading(false)
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
		} else if (country === 'AU') {
			setProvince('Northern Territory')
		} else if (country === 'US') {
			setProvince('Alabama')
		} else if (country === 'NZ') {
			setProvince('Marlborough')
		} else {
			setProvince('Alberta')
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
											if (country === 'CA') {
												return (
													<option key={country} value={country} selected>
														{countries[country]}
													</option>
												)
											} else {
												return (
													<option key={country} value={country}>
														{countries[country]}
													</option>
												)
											}
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
											: country === 'AU'
											? territories.map((territory) => {
													return (
														<option
															key={territory.short}
															value={territory.name}
														>
															{territory.name}
														</option>
													)
											  })
											: country === 'NZ'
											? nz_provinces.map((prov) => {
													return (
														<option key={prov.short} value={prov.name}>
															{prov.name}
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
						<div className="flex w-full justify-end">
							<p
								className={`text-xs ${
									review.length > 2000 ? 'text-red-400' : 'text-black'
								}`}
							>
								Character Limit: {review.length}/2000
							</p>
						</div>
					</div>
					<div>
						<p className="text-sm font-extrabold text-gray-500">
							Please keep this review as civil and objective as possible. Do not
							post any specific addresses as these will be removed. Any
							malicious or defamatory language may result in the review being
							edited or removed.
						</p>
					</div>
				</div>

				<div className="w-full py-5">
					<div className="mb-2 flex w-full justify-start space-x-2">
						<div className="flex h-5 items-center">
							<input
								id="terms"
								name="terms"
								type="checkbox"
								checked={disclaimerOne}
								onChange={() => setDisclaimerOne((p) => !p)}
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
						</div>
						<label htmlFor="terms" className="text-sm text-gray-500">
							I understand that posting a review on Rate The Landlord is public
							and can be viewed by anyone including the landlord in my review.
						</label>
					</div>
					<div className="mb-2 flex w-full justify-start space-x-2">
						<div className="flex h-5 items-center">
							<input
								id="terms"
								name="terms"
								type="checkbox"
								checked={disclaimerTwo}
								onChange={() => setDisclaimerTwo((p) => !p)}
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
						</div>
						<label htmlFor="terms" className="text-sm text-gray-500">
							I understand that once I post this review I cannot have it taken
							down unless it violates the Rate The Landlord policy and recognize
							that Rate The Landlord recommends posting reviews after my tenancy
							is over.
						</label>
					</div>
					<div className="mb-2 flex w-full justify-start space-x-2">
						<div className="flex h-5 items-center">
							<input
								id="terms"
								name="terms"
								type="checkbox"
								checked={disclaimerThree}
								onChange={() => setDisclaimerThree((p) => !p)}
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
						</div>
						<label htmlFor="terms" className="text-sm text-gray-500">
							I understand that Rate The Landlord is not responsible for any
							consequences that occur as a result my review.
						</label>
					</div>

					<div
						data-testid="create-review-form-captcha-1"
						className="my-2 flex justify-center"
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
						{loading ? (
							<div
								className={`hover:bg-teal-700' } ml-3 inline-flex justify-center rounded-md border border-transparent bg-teal-200 bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500
							focus:ring-offset-2`}
							>
								<div
									className="text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
									role="status"
								>
									<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
										Loading...
									</span>
								</div>
							</div>
						) : (
							<Button
								disabled={
									!token ||
									!disclaimerOne ||
									!disclaimerTwo ||
									!disclaimerThree ||
									maliciousStringDetected ||
									loading ||
									review.length > 2000
								}
								data-umami-event="Review Submitted"
							>
								{t('create-review.review-form.submit')}
							</Button>
						)}
					</div>
				</div>
			</form>
		</div>
	)
}

export default ReviewForm
