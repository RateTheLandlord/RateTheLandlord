import LandlordInfo from '@/components/landlord/LandlordInfo'
import {classNames} from '@/util/helper-functions'
import {Review} from '@/util/interfaces'
import {StarIcon} from '@heroicons/react/solid'
import {useTranslation} from 'react-i18next'

const Landlord = ({
	landlord,
	reviews,
}: {
	landlord: string
	reviews: Review[]
}) => {
	const {t} = useTranslation('reviews')
	const totalStars = reviews.reduce(
		(sum, review) =>
			sum +
			(Number(review.stability) +
				Number(review.health) +
				Number(review.privacy) +
				Number(review.respect) +
				Number(review.repair)),
		0,
	)
	console.log(reviews.length)
	return (
		<div className="mx-auto flex flex-row px-4 sm:px-6 lg:my-16 lg:max-w-7xl">
			<LandlordInfo
				name={landlord}
				average={Math.round(totalStars / reviews.length)}
				total={reviews.length}
			/>

			<div className="mt-16 w-3/5 lg:col-span-7 lg:mt-0">
				<h3 className="sr-only">Recent reviews</h3>

				<div className="flow-root">
					<div className="-my-12 divide-y divide-gray-200">
						{reviews.map((review) => {
							const ratings = [
								{title: t('reviews.health'), rating: review.health},
								{title: t('reviews.respect'), rating: review.respect},
								{title: t('reviews.privacy'), rating: review.privacy},
								{title: t('reviews.repair'), rating: review.repair},
								{title: t('reviews.stability'), rating: review.stability},
							]
							return (
								<div
									key={review.id}
									className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8"
								>
									<div className="flex flex-row flex-wrap items-center xl:col-span-1">
										{ratings.map((rating) => {
											return (
												<div key={rating.title} className="mx-2 my-1">
													<p>{rating.title}</p>
													<div className="flex items-center">
														{[0, 1, 2, 3, 4].map((star) => (
															<StarIcon
																key={star}
																className={classNames(
																	parseInt(rating.rating) > star
																		? 'text-yellow-400'
																		: 'text-gray-200',
																	'h-5 w-5 flex-shrink-0',
																)}
																aria-hidden="true"
															/>
														))}
													</div>
												</div>
											)
										})}
									</div>

									<div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
										<p>{t('reviews.review')}</p>
										{/* {review.admin_edited ? (
									<p className="text-xs text-red-400">
										{t('reviews.edited')}
									</p>
								) : null} */}

										<div className="mt-3 space-y-6 text-sm text-gray-500">
											{review.review}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getStaticPaths() {
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
