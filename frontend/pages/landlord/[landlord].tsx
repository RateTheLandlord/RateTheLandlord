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
	const average = Math.round(totalStars / (reviews.length * 5))
	console.log(reviews)
	return (
		<div className="flex w-full justify-center">
			<div className="mx-auto flex max-w-2xl flex-row px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="w-2/5 bg-blue-200">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						{landlord}
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
						<p className="ml-2 text-sm text-gray-900">
							Based on {reviews.length} reviews
						</p>
					</div>
					<div className="mt-10">
						<h3 className="text-lg font-medium text-gray-900">
							Share your thoughts
						</h3>
						<p className="mt-1 text-sm text-gray-600">
							If you’ve used this product, share your thoughts with other
							customers
						</p>

						<a
							href="#"
							className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
						>
							Write a review
						</a>
					</div>
				</div>
				<div className="flex w-2/5 flex-col divide-y divide-gray-200 bg-green-200">
					{reviews.map((review) => {
						const ratings = [
							{title: t('reviews.health'), rating: review.health},
							{title: t('reviews.respect'), rating: review.respect},
							{title: t('reviews.privacy'), rating: review.privacy},
							{title: t('reviews.repair'), rating: review.repair},
							{title: t('reviews.stability'), rating: review.stability},
						]
						const date = new Date(review.date_added).toLocaleDateString()
						return (
							<div key={review.id} className="flex w-full flex-row gap-8 pt-10">
								<div className="flex w-full flex-row">
									<div className="flex flex-row flex-wrap items-center">
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

									<div className="mt-4 grow lg:mt-6 xl:mt-0">
										{/* <p>{date}</p> */}
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
							</div>
						)
					})}
				</div>
			</div>
		</div>
		// <div className="container w-full bg-white">
		// 	<div className="flex w-full flex-row justify-center">
		// 		<div className="min-w-[40%]">
		// 			<h2 className="text-2xl font-bold tracking-tight text-gray-900">
		// 				{landlord}
		// 			</h2>

		// 			<div className="mt-3 flex items-center">
		// 				<div>
		// 					<div className="flex items-center">
		// 						{[0, 1, 2, 3, 4].map((rating) => (
		// 							<StarIcon
		// 								key={rating}
		// 								className={classNames(
		// 									average > rating ? 'text-yellow-400' : 'text-gray-300',
		// 									'h-5 w-5 flex-shrink-0',
		// 								)}
		// 								aria-hidden="true"
		// 							/>
		// 						))}
		// 					</div>
		// 					<p className="sr-only">{average} out of 5 stars</p>
		// 				</div>
		// 				<p className="ml-2 text-sm text-gray-900">
		// 					Based on {reviews.length} reviews
		// 				</p>
		// 			</div>

		// 			{/* <div className="mt-6">
		// 				<h3 className="sr-only">Review data</h3>

		// 				<dl className="space-y-3">
		// 					{reviews.map((count) => (
		// 						<div key={count.rating} className="flex items-center text-sm">
		// 							<dt className="flex flex-1 items-center">
		// 								<p className="w-3 font-medium text-gray-900">
		// 									{count.rating}
		// 									<span className="sr-only"> star reviews</span>
		// 								</p>
		// 								<div
		// 									aria-hidden="true"
		// 									className="ml-1 flex flex-1 items-center"
		// 								>
		// 									<StarIcon
		// 										className={classNames(
		// 											count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
		// 											'h-5 w-5 flex-shrink-0',
		// 										)}
		// 										aria-hidden="true"
		// 									/>

		// 									<div className="relative ml-3 flex-1">
		// 										<div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
		// 										{count.count > 0 ? (
		// 											<div
		// 												className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
		// 												style={{
		// 													width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
		// 												}}
		// 											/>
		// 										) : null}
		// 									</div>
		// 								</div>
		// 							</dt>
		// 							<dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
		// 								{Math.round((count.count / reviews.totalCount) * 100)}%
		// 							</dd>
		// 						</div>
		// 					))}
		// 				</dl>
		// 			</div> */}

		// 			<div className="mt-10">
		// 				<h3 className="text-lg font-medium text-gray-900">
		// 					Share your thoughts
		// 				</h3>
		// 				<p className="mt-1 text-sm text-gray-600">
		// 					If you’ve used this product, share your thoughts with other
		// 					customers
		// 				</p>

		// 				<a
		// 					href="#"
		// 					className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
		// 				>
		// 					Write a review
		// 				</a>
		// 			</div>
		// 		</div>

		// 		<div className="w-3/5">
		// 			<div className="mt-6 flex w-full flex-col space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
		// 				{reviews.map((review) => {
		// 					const ratings = [
		// 						{title: t('reviews.health'), rating: review.health},
		// 						{title: t('reviews.respect'), rating: review.respect},
		// 						{title: t('reviews.privacy'), rating: review.privacy},
		// 						{title: t('reviews.repair'), rating: review.repair},
		// 						{title: t('reviews.stability'), rating: review.stability},
		// 					]
		// 					const date = new Date(review.date_added).toDateString()
		// 					return (
		// 						<div key={review.id} className="flex w-full flex-row">
		// 							<div className="mt-6 flex flex-wrap items-center text-sm">
		// 								<div className="mb-4 flex w-full items-center lg:mb-0">
		// 									{[0, 1, 2, 3, 4].map((star) => {
		// 										const totalReview = ratings.reduce(
		// 											(sum, rating) => sum + Number(rating.rating),
		// 											0,
		// 										)

		// 										const avgRating = Math.round(
		// 											totalReview / ratings.length,
		// 										)
		// 										return (
		// 											<StarIcon
		// 												key={star}
		// 												className={classNames(
		// 													avgRating > star
		// 														? 'text-yellow-400'
		// 														: 'text-gray-200',
		// 													'h-5 w-5 flex-shrink-0',
		// 												)}
		// 												aria-hidden="true"
		// 											/>
		// 										)
		// 									})}
		// 								</div>
		// 								<p className="w-full text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">{`${
		// 									review.city
		// 								}, ${review.state}, ${
		// 									review.country_code === 'GB' ? 'UK' : review.country_code
		// 								}, ${review.zip}`}</p>
		// 								<p className="mb-4 text-gray-500 lg:mb-0 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
		// 									{date}
		// 								</p>
		// 								{/* <div className="mt-4 w-full">
		// 									<ButtonLight onClick={() => handleReport(review)}>
		// 										{t('reviews.report-review')}
		// 									</ButtonLight>
		// 								</div> */}
		// 							</div>
		// 							<div className="flex grow flex-row">
		// 								<div className="flex flex-row flex-wrap items-center xl:col-span-1">
		// 									{ratings.map((rating) => {
		// 										return (
		// 											<div key={rating.title} className="mx-2 my-1">
		// 												<p>{rating.title}</p>
		// 												<div className="flex items-center">
		// 													{[0, 1, 2, 3, 4].map((star) => (
		// 														<StarIcon
		// 															key={star}
		// 															className={classNames(
		// 																parseInt(rating.rating) > star
		// 																	? 'text-yellow-400'
		// 																	: 'text-gray-200',
		// 																'h-5 w-5 flex-shrink-0',
		// 															)}
		// 															aria-hidden="true"
		// 														/>
		// 													))}
		// 												</div>
		// 											</div>
		// 										)
		// 									})}
		// 								</div>

		// 								<div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
		// 									<p>{t('reviews.review')}</p>
		// 									{/* {review.admin_edited ? (
		// 										<p className="text-xs text-red-400">
		// 											{t('reviews.edited')}
		// 										</p>
		// 									) : null} */}

		// 									<div className="mt-3 space-y-6 text-sm text-gray-500">
		// 										{review.review}
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					)
		// 				})}
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
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
