import LandlordInfo from '@/components/landlord/LandlordInfo'
import {classNames} from '@/util/helper-functions'
import {StarIcon} from '@heroicons/react/solid'
import {GetStaticPropsContext} from 'next'

const reviews = {
	average: 4,
	totalCount: 1624,
	counts: [
		{rating: 5, count: 1019},
		{rating: 4, count: 162},
		{rating: 3, count: 97},
		{rating: 2, count: 199},
		{rating: 1, count: 147},
	],
	featured: [
		{
			id: 1,
			rating: 5,
			content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
			author: 'Emily Selman',
			avatarSrc:
				'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
		},
		// More reviews...
	],
}

const Landlord = ({landlord}: {landlord: string}) => {
	console.log(landlord)
	return (
		<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:my-16 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:px-8">
			<LandlordInfo name="Landlord Name" average={2.5} total={20} />

			<div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
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
			</div>
		</div>
	)
}

export async function getStaticPaths() {
	try {
		const req = await fetch(`http://backend:8080/review/landlords`)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data: string[] = await req.json()

		const paths = data.map((landlord) => ({
			params: {landlord: landlord},
		}))

		console.log(paths)

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

export function getStaticProps({params}: {params: {landlord: string}}) {
	console.log(params)
	return {
		props: {
			landlord: params.landlord,
		},
	}
}

export default Landlord
