/* eslint-disable no-mixed-spaces-and-tabs */
import {Review} from '@/util/interfaces/interfaces'
import {Dispatch, SetStateAction} from 'react'
import countries from '@/util/countries/countries.json'
import provinces from '@/util/countries/canada/provinces.json'
import regions from '@/util/countries/unitedKingdom/regions.json'
import states from '@/util/countries/unitedStates/states.json'
import territories from '@/util/countries/australia/territories.json'
import {country_codes} from '@/util/helpers/getCountryCodes'

interface IProps {
	selectedReview: Review | undefined
	review: string
	setReview: Dispatch<SetStateAction<string>>
	landlord: string
	setLandlord: Dispatch<SetStateAction<string>>
	country: string
	setCountry: Dispatch<SetStateAction<string>>
	city: string
	setCity: Dispatch<SetStateAction<string>>
	province: string
	setProvince: Dispatch<SetStateAction<string>>
	postal: string
	setPostal: Dispatch<SetStateAction<string>>
}

const EditReviewModal = ({
	selectedReview,
	review,
	setReview,
	landlord,
	setLandlord,
	country,
	setCountry,
	city,
	setCity,
	province,
	setProvince,
	postal,
	setPostal,
}: IProps) => {
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
							value={landlord ? landlord : selectedReview?.landlord}
							onChange={(e) => setLandlord(e.target.value)}
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
						Country
					</label>
					<div className="mt-1">
						<select
							id="country"
							name="country"
							required
							value={country ? country : selectedReview?.country_code}
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
						City
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="city"
							id="city"
							placeholder="city"
							value={city ? city : selectedReview?.city}
							required
							onChange={(e) => setCity(e.target.value)}
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
						Province / State
					</label>
					<div className="mt-1">
						<select
							id="region"
							name="region"
							required
							value={province ? province : selectedReview?.state}
							onChange={(e) => setProvince(e.target.value)}
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
											<option key={territory.short} value={territory.name}>
												{territory.name}
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
							value={postal ? postal : selectedReview?.zip}
							onChange={(e) => setPostal(e.target.value)}
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
						value={review ? review : selectedReview?.review}
						data-testid="edit-review-modal-1"
					/>
				</div>
			</div>
		</div>
	)
}

export default EditReviewModal
