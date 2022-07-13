import React, {useState} from 'react'
import Button from '../ui/button'
import ButtonLight from '../ui/button-light'
import RatingsRadio from './ratings-radio'
import postalCodes from 'postal-codes-js'
import countries from '@/util/countries.json'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import {useTranslations} from 'next-intl'

//This components will hold the review form and it's data handling logic
//Completed reviews should be sent to the backend with a success confirmation for the user (maybe need a Modal?)
//Once completed, it should give an option to reset the form for another review or direct Client to Reviews page

//TODO hook up with backend
//TODO create error handling for regex tests

const countryCodes = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US',
)

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string
const siteKey = process.env.NEXT_PUBLIC_HCPATCHA_SITE_KEY as string

function ReviewForm(): JSX.Element {
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

	const [token, setToken] = useState<string>('')

	const t = useTranslations('Submit-Review')

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()

		if (!postalCodes.validate(country, postal)) {
			//Postal error message
		}

		fetch(`${apiUrl}/review`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				captchaToken: token,
				review: {
					landlord: landlord,
					countryCode: country,
					city: city,
					state: province,
					zip: postal,
					review: review,
					repair: repair,
					health: health,
					stability: stability,
					privacy: privacy,
					respect: respect,
				},
			}),
		})
			.then((result: Response) => {
				console.log(result)
			})
			.catch(() => {
				console.log('error')
			})
	}

	const onVerifyCaptcha = (token: string) => {
		setToken(token)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-8 divide-y divide-gray-200"
		>
			<div className="space-y-8 divide-y divide-gray-200">
				<div className="pt-8">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							{t('form-heading')}
						</h3>
						<p className="mt-1 text-sm text-gray-500">{t('sub-heading')}</p>
					</div>
					<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="landlord"
								className="block text-sm font-medium text-gray-700"
							>
								{t('landlord-info')}
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="landlord"
									id="landlord"
									required
									placeholder="Landlord / Property Management"
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
								{t('country')}
							</label>
							<div className="mt-1">
								<select
									id="country"
									name="country"
									required
									onChange={(e) => setCountry(e.target.value)}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								>
									{countryCodes.map((country) => {
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
								{t('city')}
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="city"
									id="city"
									placeholder="City"
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
								{t('province')}
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="region"
									id="region"
									placeholder="State / Province"
									onChange={(e) => setProvince(e.target.value)}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="postal-code"
								className="block text-sm font-medium text-gray-700"
							>
								{t('postal')}
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="postal-code"
									id="postal-code"
									placeholder="Postal Code / ZIP"
									required
									onChange={(e) => setPostal(e.target.value)}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
						{t('rating')}
					</h3>
					<RatingsRadio
						title={t('repair')}
						body={t('repair-desc')}
						rating={repair}
						setRating={setRepair}
					/>
					<RatingsRadio
						title={t('health')}
						body={t('health-desc')}
						rating={health}
						setRating={setHealth}
					/>

					<RatingsRadio
						title={t('stability')}
						body={t('stability-desc')}
						rating={stability}
						setRating={setStability}
					/>

					<RatingsRadio
						title={t('privacy')}
						body={t('privacy-desc')}
						rating={privacy}
						setRating={setPrivacy}
					/>

					<RatingsRadio
						title={t('respect')}
						body={t('respect-desc')}
						rating={respect}
						setRating={setRespect}
					/>
				</div>
			</div>
			<div>
				<label htmlFor="comment" className="block font-medium text-gray-700">
					{t('written')}
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
					<ButtonLight>{t('reset')}</ButtonLight>
					<Button disabled={!token}>{t('submit')}</Button>
				</div>
			</div>
		</form>
	)
}

export default ReviewForm
