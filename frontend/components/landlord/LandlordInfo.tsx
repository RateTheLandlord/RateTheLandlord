import {classNames} from '@/util/helper-functions'
import {StarIcon} from '@heroicons/react/solid'

const LandlordInfo = ({name, average, total}) => {
	return (
		<div className="w-full">
			<h2 className="text-2xl font-bold tracking-tight text-gray-900">
				{name}
			</h2>

			<div className="mt-3 flex items-center">
				<div>
					<div className="flex items-center">
						{[0, 1, 2, 3, 4].map((rating) => (
							<StarIcon
								key={rating}
								className={classNames(
									average > rating ? 'text-yellow-400' : 'text-gray-300',
									'h-5 w-5 flex-shrink-0',
								)}
								aria-hidden="true"
							/>
						))}
					</div>
					<p className="sr-only">{average} out of 5 stars</p>
				</div>
				<p className="ml-2 text-sm text-gray-900">Based on {total} reviews</p>
			</div>
			<div className="mt-10">
				<h3 className="text-lg font-medium text-gray-900">
					Share your thoughts
				</h3>
				<p className="mt-1 text-sm text-gray-600">
					If you've had this Landlord, share your experience with other tenants
				</p>

				<a
					href="/create-review"
					className="mt-6 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
				>
					Write a review
				</a>
			</div>
		</div>
	)
}

export default LandlordInfo
