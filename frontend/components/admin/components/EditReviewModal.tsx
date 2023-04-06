/* eslint-disable no-mixed-spaces-and-tabs */
import {Review} from '@/util/interfaces'
import {Dispatch, SetStateAction, useState} from 'react'
import countries from '@/util/countries.json'
import provinces from '@/util/provinces.json'
import states from '@/util/states.json'

interface IProps {
	review: Review | undefined
	setReview: Dispatch<SetStateAction<string>>
}

const country_codes = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US',
)

const EditReviewModal = ({review, setReview}: IProps) => {
	console.log(review)
	const [landlord, setLandlord] = useState<string>(review?.landlord || '')
	const [country, setCountry] = useState<string>(review?.country_code || '')
	const [city, setCity] = useState<string>(review?.city || '')
	const [province, setProvince] = useState<string>(review?.state || '')
	const [postal, setPostal] = useState<string>(review?.zip || '')
	return (
		<div>
			<div className="mt-1">
				<div className="sm:col-span-3">
					<label
						htmlFor="landlord"
						className="block text-sm font-medium text-gray-700"
					>
						Landlord
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="landlord"
							id="landlord"
							required
							placeholder="Landlord"
							value={landlord}
							onChange={(e) => setLandlord(e.target.value)}
							className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							data-testid="create-review-form-landlord-1"
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
							value={country}
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
						City
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="city"
							id="city"
							placeholder="city"
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
							className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							data-testid="create-review-form-city-1"
						/>
					</div>
				</div>
				<div className="sm:col-span-2">
					<label
						htmlFor="region"
						className="block text-sm font-medium text-gray-700"
					>
						Province / State
					</label>
					<div className="mt-1">
						<select
							id="region"
							name="region"
							required
							value={province}
							onChange={(e) => setProvince(e.target.value)}
							className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
						>
							<option>{province}</option>
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
						Postal Code / ZIP
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="postal-code"
							id="postal-code"
							placeholder="Postal Code / ZIP"
							required
							value={postal}
							onChange={(e) => setPostal(e.target.value)}
							className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
							data-testid="create-review-form-postal-code-1"
						/>
					</div>
				</div>
				<div className="sm:col-span-2">
					<label
						htmlFor="review"
						className="block text-sm font-medium text-gray-700"
					>
						Review
					</label>
					<textarea
						rows={4}
						name="review"
						id="review"
						className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						onChange={(e) => setReview(e.target.value)}
						defaultValue={review?.review}
						data-testid="edit-review-modal-1"
					/>
				</div>
			</div>
		</div>
	)
}

export default EditReviewModal
