/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useState} from 'react'
import Button from '../ui/button'
import ButtonLight from '../ui/button-light'
import RatingsRadio from './ratings-radio'
import postalCodes from 'postal-codes-js'
import countries from '@/util/countries.json'
import provinces from '@/util/provinces.json'
import states from '@/util/states.json'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import {useTranslation} from 'react-i18next'
import profanity from '@/util/profanity.json'
import Alert from '../alerts/Alert'
import SuccessModal from './success-modal'
import ProfanityModal from './profanity-modal'

//This components will hold the review form and it's data handling logic
//Completed reviews should be sent to the backend with a success confirmation for the user (maybe need a Modal?)
//Once completed, it should give an option to reset the form for another review or direct Client to Reviews page

const country_codes = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US',
)

const siteKey = process.env.NEXT_PUBLIC_HCPATCHA_SITE_KEY as string

function ReviewForm(): JSX.Element {
	const {t} = useTranslation()

	const [profanityModalOpen, setProfanityModalOpen] = useState<boolean>(false)
	const [success, setSuccess] = useState(false)
	const [alertOpen, setAlertOpen] = useState(false)
	const [successModalOpen, setSuccessModalOpen] = useState(false)

	const [landlord, setLandlord] = useState<string>('')
	const [country, setCountry] = useState<string>('CA')
	const [city, setCity] = useState<string>('')
	const [province, setProvince] = useState<string>('')
	const [postal, setPostal] = useState<string>('')

	const [repair, setRepair] = useState<number>(3)
	const [health, setHealth] = useState<number>(3)
	const [stability, setStability] = useState<number>(3)
	const [privacy, setPrivacy] = useState<number>(3)
	const [respect, setRespect] = useState<number>(3)
	const [review, setReview] = useState<string>('')

	const [flagged, setFlagged] = useState<boolean>(false)
	const [flagged_reason, setflagged_reason] = useState<string>('')

	const [token, setToken] = useState<string>('')

	const [postalError, setPostalError] = useState(false)

	const profanityCheck = (e: React.FormEvent): void => {
		e.preventDefault()

		const foundSwears = profanity.filter((word) =>
			review.toLowerCase().includes(word.toLowerCase()),
		)
		if (foundSwears.length) {
			setFlagged(true)
			setflagged_reason('Profanity')
			setProfanityModalOpen(true)
		} else {
			setFlagged(false)
			setflagged_reason('')
			handleSubmit()
		}
	}

	const handleSubmit = (): void => {
		if (!postalCodes.validate(country, postal)) {
			setPostalError(true)
		}

		fetch(`/api/submit-review`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				captchaToken: token,
				review: {
					landlord: landlord,
					country_code: country,
					city: city,
					state: province,
					zip: postal,
					review: review,
					repair: repair,
					health: health,
					stability: stability,
					privacy: privacy,
					respect: respect,
					flagged: flagged,
					flagged_reason: flagged_reason,
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
	}

	const onVerifyCaptcha = (token: string) => {
		setToken(token)
	}

	return (
		<div className="w-full flex flex-col container items-center">
			{alertOpen ? (
				<Alert success={success} setAlertOpen={setAlertOpen} />
			) : null}
			<SuccessModal isOpen={successModalOpen} setIsOpen={setSuccessModalOpen} />
			<ProfanityModal
				isOpen={profanityModalOpen}
				setIsOpen={setProfanityModalOpen}
				onSubmit={handleSubmit}
			/>
			<div className="w-full my-3">
				<h1 className="text-4xl font-extrabold border-b-teal-600 border-b-2">
					{t('create-review.review-form.header')}
				</h1>
			</div>
			<form
				onSubmit={profanityCheck}
				className="space-y-8 divide-y divide-gray-200 w-full"
			>
				<div className="space-y-8 divide-y divide-gray-200">
					<div className="pt-8">
						<div>
							<h3 className="text-lg leading-6 font-medium text-gray-900">
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
										onChange={(e) => setLandlord(e.target.value)}
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
										onChange={(e) => setCity(e.target.value)}
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium text-gray-700"
								>
									{t('create-review.review-form.state')}
								</label>
								<div className="mt-1">
									<select
										id="region"
										name="region"
										required
										onChange={(e) => setProvince(e.target.value)}
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									>
										{country === 'CA'
											? provinces.map((province) => {
													return (
														<option key={province.short} value={province.name}>
															{province.name}
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
										onChange={(e) => setPostal(e.target.value)}
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
								{postalError ? (
									<p className="text-red-400 text-xs">
										{t('create-review.review-form.postal-error')}
									</p>
								) : null}
							</div>
						</div>
					</div>
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							{t('create-review.review-form.rate-title')}
						</h3>
						<RatingsRadio
							title={t('create-review.review-form.repair')}
							rating={repair}
							setRating={setRepair}
						/>
						<RatingsRadio
							title={t('create-review.review-form.health')}
							rating={health}
							setRating={setHealth}
						/>

						<RatingsRadio
							title={t('create-review.review-form.stability')}
							rating={stability}
							setRating={setStability}
						/>

						<RatingsRadio
							title={t('create-review.review-form.privacy')}
							rating={privacy}
							setRating={setPrivacy}
						/>

						<RatingsRadio
							title={t('create-review.review-form.respect')}
							rating={respect}
							setRating={setRespect}
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor="comment"
						className="block text-sm font-medium text-gray-700"
					>
						{t('create-review.review-form.review')}
					</label>
					<div className="mt-1">
						<textarea
							rows={4}
							name="comment"
							id="comment"
							onChange={(e) => setReview(e.target.value)}
							className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							defaultValue={''}
						/>
					</div>
				</div>

				<div className="pt-5">
					<div className="flex justify-center mb-2">
						<HCaptcha sitekey={siteKey} onVerify={onVerifyCaptcha} />
					</div>

					<div className="flex justify-end">
						<ButtonLight>{t('create-review.review-form.reset')}</ButtonLight>
						{/* disabled={!token} */}
						<Button>{t('create-review.review-form.submit')}</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ReviewForm
