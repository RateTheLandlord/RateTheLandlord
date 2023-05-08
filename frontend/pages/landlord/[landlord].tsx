import LandlordInfo from '@/components/landlord/LandlordInfo'
import {classNames} from '@/util/helper-functions'
import {Review} from '@/util/interfaces'
import {StarIcon} from '@heroicons/react/solid'

const Landlord = ({
	landlord,
	reviews,
}: {
	landlord: string
	reviews: Review[]
}) => {
	console.log(landlord)
	return (
		<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:my-16 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:px-8">
			<LandlordInfo name="Landlord Name" average={2.5} total={20} />

			{/* <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
				<h3 className="sr-only">Recent reviews</h3>

				<div className="flow-root">
					<div className="-my-12 divide-y divide-gray-200">
						{reviews.featured.map((review) => (
							<div key={review.id} className="py-12">
								<div className="flex items-center">
									<div className="ml-4">
										<div className="mt-1 flex items-center">
											{[0, 1, 2, 3, 4].map((rating) => (
												<StarIcon
													key={rating}
													className={classNames(
														review.rating > rating
															? 'text-yellow-400'
															: 'text-gray-300',
														'h-5 w-5 flex-shrink-0',
													)}
													aria-hidden="true"
												/>
											))}
										</div>
										<p className="sr-only">{review.rating} out of 5 stars</p>
									</div>
								</div>

								<div
									className="mt-4 space-y-6 text-base italic text-gray-600"
									dangerouslySetInnerHTML={{__html: review.content}}
								/>
							</div>
						))}
					</div>
				</div>
			</div> */}
		</div>
	)
}

export async function getStaticPaths() {
	try {
		const req = await fetch(`http://backend:8080/review/landlords`)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data: string[] = await req.json()

		const paths = data.map((landlord) => ({
			params: {landlord: landlord.split(' ').join('%20')},
		}))

		console.log('Paths: ', paths)

		return {
			paths: paths,
			fallback: false,
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export async function getStaticProps({params}: {params: {landlord: string}}) {
	console.log('PARAMS: ', params)

	try {
		const req = await fetch(
			`http://backend:8080/review/landlords/${params.landlord}`,
		)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data: Review[] = await req.json()

		console.log(data)
		return {
			props: {
				landlord: params.landlord,
				reviews: data,
			},
			revalidate: 100,
		}
	} catch (error) {
		return {
			props: {
				landlord: '',
				reviews: [],
			},
			revalidate: 100,
		}
	}
}

export default Landlord
