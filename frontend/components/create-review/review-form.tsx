import React, {useState} from 'react'
import Button from '../ui/button'
import ButtonLight from '../ui/button-light'
import RatingsRadio from './ratings-radio'
import postalCodes from 'postal-codes-js'
import countries from '@/util/countries.json'

//This components will hold the review form and it's data handling logic
//Completed reviews should be sent to the backend with a success confirmation for the user (maybe need a Modal?)
//Once completed, it should give an option to reset the form for another review or direct Client to Reviews page

//TODO hook up with backend
//TODO create error handling for regex tests

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!postalCodes.validate(country, postal)) {
			//Postal error message
		}

		console.log('landlord: ', landlord)
		console.log('country: ', country)
		console.log('city: ', city)
		console.log('province: ', province)
		console.log('postal: ', postal)
		console.log('review: ', review)

		//This is for the eventual call to the backend
		// const body = {
		// 	landlord: landlord,
		// 	country: country,
		// 	city: city,
		// 	province: province,
		// 	postal: postal
		// }
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
							Landlord / Property Management Information
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Please make sure all this information matches your Lease
						</p>
					</div>
					<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="landlord"
								className="block text-sm font-medium text-gray-700"
							>
								Landlord / Property Management Company
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
								Country
							</label>
							<div className="mt-1">
								<select
									id="country"
									name="country"
									required
									onChange={(e) => setCountry(e.target.value)}
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
								>
									<option value="CA">Canada</option>
								</select>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="city"
								className="block text-sm font-medium text-gray-700"
							>
								City
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
								State / Province
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
								ZIP / Postal code
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
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Please rate the following on a scale from 1(worst) to 5(best)
					</h3>
					<RatingsRadio title="Repair" rating={repair} setRating={setRepair} />
					<RatingsRadio
						title="Health and Safety"
						rating={health}
						setRating={setHealth}
					/>

					<RatingsRadio
						title="Rental Stability"
						rating={stability}
						setRating={setStability}
					/>

					<RatingsRadio
						title="Tenant Privacy"
						rating={privacy}
						setRating={setPrivacy}
					/>

					<RatingsRadio
						title="Respect"
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
					Written Review
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
				<div className="flex justify-end">
					<ButtonLight>Reset</ButtonLight>
					<Button>Submit</Button>
				</div>
			</div>
		</form>
	)
}

export default ReviewForm
