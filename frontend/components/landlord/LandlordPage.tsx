import {useState} from 'react'
import ReportModal from '../reviews/report-modal'
import LandlordInfo from './LandlordInfo'
import {useTranslation} from 'react-i18next'
import {Review} from '@/util/interfaces/interfaces'
import {StarIcon} from '@heroicons/react/solid'
import {classNames} from '@/util/helpers/helper-functions'
import ButtonLight from '../ui/button-light'

const LandlordPage = ({
	landlord,
	reviews,
}: {
	landlord: string
	reviews: Review[]
}) => {
	const {t} = useTranslation('reviews')
	const [reportOpen, setReportOpen] = useState<boolean>(false)

	const [selectedReview, setSelectedReview] = useState<Review | undefined>()

	if (!reviews.length) return <div>Loading... </div>

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

	const handleReport = (review: Review) => {
		setSelectedReview(review)
		setReportOpen(true)
	}
	const average = Math.round(totalStars / (reviews.length * 5))
	return (
		<>
			<ReportModal
				isOpen={reportOpen}
				setIsOpen={setReportOpen}
				selectedReview={selectedReview}
			/>
			<div className="mt-10 flex w-full justify-center">
				<div className="mx-auto flex max-w-2xl flex-col gap-3 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<LandlordInfo
						name={landlord}
						total={reviews.length}
						average={average}
					/>
					<div className="flex w-full flex-col gap-3 divide-y divide-gray-200">
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
								<div
									key={review.id}
									className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
								>
									<div className="mt-6 flex flex-wrap items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
										<div className="mb-4 flex w-full items-center lg:mb-0">
											{[0, 1, 2, 3, 4].map((star) => {
												let totalReview = 0
												for (let i = 0; i < ratings.length; i++) {
													totalReview += parseInt(ratings[i].rating)
												}
												const avgRating = Math.round(
													totalReview / ratings.length,
												)
												return (
													<StarIcon
														key={star}
														className={classNames(
															avgRating > star
																? 'text-yellow-400'
																: 'text-gray-200',
															'h-5 w-5 flex-shrink-0',
														)}
														aria-hidden="true"
													/>
												)
											})}
										</div>
										<p className="w-full text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">{`${
											review.city
										}, ${review.state}, ${
											review.country_code === 'GB' ? 'UK' : review.country_code
										}, ${review.zip}`}</p>
										<p className="mb-4 text-gray-500 lg:mb-0 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
											{date}
										</p>
										<div className="mt-4 w-full">
											<ButtonLight onClick={() => handleReport(review)}>
												{t('reviews.report-review')}
											</ButtonLight>
										</div>
									</div>
									<div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
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
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export default LandlordPage
