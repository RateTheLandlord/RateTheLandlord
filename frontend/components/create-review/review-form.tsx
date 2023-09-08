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
import SpamReviewModal from '@/components/create-review/SpamReviewModal'
import SheldonModal from '@/components/create-review/SheldonModal'
import {sheldonReview} from '@/components/create-review/helper'
import {useLocation} from '@/util/hooks/useLocation'
import {useLandlordSuggestions} from '@/util/hooks/useLandlordSuggestions'
import CityComboBox from '@/components/create-review/components/CityComboBox'
import LandlordComboBox from '@/components/create-review/components/LandlordComboBox'
import {ILocationHookResponse} from '@/util/interfaces/interfaces'
import {useFlags} from 'flagsmith/react'

const siteKey = process.env.NEXT_PUBLIC_HCPATCHA_SITE_KEY as string

function ReviewForm(): JSX.Element {
	const {t} = useTranslation('create')
	const {maintenance_mode} = useFlags(['maintenance_mode'])

	const [success, setSuccess] = useState(false)
	const [alertOpen, setAlertOpen] = useState(false)
	const [maliciousAlertOpen, setMaliciousAlertOpen] = useState(false)
	const [successModalOpen, setSuccessModalOpen] = useState(false)
	const [reviewModalOpen, setReviewModalOpen] = useState(false)
	const [spamReviewModalOpen, setSpamReviewModalOpen] = useState(false)
	const [sheldonReviewOpen, setSheldonReviewOpen] = useState(false)

	const [landlord, setLandlord] = useState<string>('')
	const [country, setCountry] = useState<string>('CA')
	const [city, setCity] = useState<string>('')
	const [province, setProvince] = useState<string>('Alberta')
	const [postal, setPostal] = useState<string>('')

	const {
		searching,
		locations,
	}: {searching: boolean; locations: Array<ILocationHookResponse>} =
		useLocation(city, country)
	const {
		isSearching,
		landlordSuggestions,
	}: {isSearching: boolean; landlordSuggestions: Array<string>} =
		useLandlordSuggestions(landlord)

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
	const [touchedPostal, setTouchedPostal] = useState(false)

	const [landlordValidationError, setLandlordValidationError] = useState(false)
	const [landlordValidationText, setLandlordValidationText] = useState('')

	const [cityValidationError, setCityValidationError] = useState(false)
	const [cityValidationErrorText, setCityValidationErrorText] = useState('')

	// Additional state for disabling submit
	const [maliciousStringDetected, setMaliciousStringDetected] = useState(false)

	// Check for already reviewed landlord from browser
	const [localReviewedLandlords, setLocalReviewedLandlords] =
		useState<Array<string> | null>(null)

	useEffect(() => {
		const prevLandlords = localStorage.getItem('rtl')
		if (prevLandlords) {
			const landlordArr = prevLandlords.split(',')
			setLocalReviewedLandlords(landlordArr)
		}
	}, [])

	const checkLandlord = (str: string) => {
		if (localReviewedLandlords) {
			return localReviewedLandlords.indexOf(str) > -1
		}
		return false
	}

	const checkSheldon = () => {
		if (/sheldon rakowsky/i.test(landlord)) {
			return review === sheldonReview
		}
		return false
	}

	// Malicious string check
	const detectMaliciousString = (stringToCheck: string): boolean => {
		const maliciousPatterns = /<script>|http|\p{Extended_Pictographic}/giu
		return maliciousPatterns.test(stringToCheck)
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
					setTouchedPostal(true)
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

	useEffect(() => {
		if (touchedPostal) {
			if (postcodeValidator(postal, country)) {
				setPostalError(false)
				setLoading(false)
			} else {
				setPostalError(true)
			}
		}
	}, [postal, country, touchedPostal])

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		if (landlord.trim().length < 1) {
			setLandlordValidationError(true)
			setLandlordValidationText('Landlord Name cannot be empty')
			return
		}
		if (checkLandlord(landlord.toLocaleUpperCase())) {
			setSpamReviewModalOpen(true)
			return
		}
		if (city.trim().length < 1) {
			setCityValidationError(true)
			setCityValidationErrorText('City cannot be empty')
			return
		}
		if (checkSheldon()) {
			setSheldonReviewOpen(true)
			return
		}
		if (review.trim().length < 1) {
			setReviewModalOpen(true)
		} else {
			if (postcodeValidator(postal, country)) {
				setLoading(true)
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
						const storageItem = localStorage.getItem('rtl')
						if (storageItem) {
							const newItem = `${storageItem},${landlord.toLocaleUpperCase()}`
							localStorage.setItem('rtl', newItem)
						} else {
							localStorage.setItem('rtl', `${landlord.toLocaleUpperCase()}`)
						}
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

	const setLandlordName = (landlordName: string) => {
		setLandlordValidationError(false)
		setLandlord(landlordName)
	}

	const setCityName = (cityName: string) => {
		setCityValidationError(false)
		setCity(cityName)
	}

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
			<SpamReviewModal
				isOpen={spamReviewModalOpen}
				setIsOpen={setSpamReviewModalOpen}
			/>
			<SheldonModal
				isOpen={sheldonReviewOpen}
				setIsOpen={setSheldonReviewOpen}
			/>
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
						<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<LandlordComboBox
									name={t('create-review.review-form.landlord')}
									state={landlord}
									setState={setLandlordName}
									suggestions={landlordSuggestions}
									isSearching={isSearching}
									error={landlordValidationError}
									errorText={landlordValidationText}
								/>
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
								<CityComboBox
									name={t('create-review.review-form.city')}
									state={city}
									setState={setCityName}
									options={locations}
									searching={searching}
									error={cityValidationError}
									errorText={cityValidationErrorText}
								/>
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
								{t('create-review.review-form.limit', {length: review.length})}
							</p>
						</div>
					</div>
					<div>
						<p className="text-sm font-extrabold text-gray-500">
							{t('create-review.review-form.civil')}
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
							{t('create-review.review-form.disclaimer-1')}
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
							{t('create-review.review-form.disclaimer-2')}
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
							{t('create-review.review-form.disclaimer-3')}
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
						<ButtonLight umami="Create Review / Reset Button">
							{t('create-review.review-form.reset')}
						</ButtonLight>
						{loading ? (
							<div
								className={`hover:bg-teal-700' } ml-3 inline-flex justify-center rounded-md border border-transparent bg-teal-200 bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500
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
								umami="Create Review / Submit Button"
								disabled={
									!token ||
									!disclaimerOne ||
									!disclaimerTwo ||
									!disclaimerThree ||
									maliciousStringDetected ||
									loading ||
									review.length > 2000 ||
									maintenance_mode.enabled
								}
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