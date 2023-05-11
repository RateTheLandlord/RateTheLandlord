import LandlordInfo from '@/components/landlord/LandlordInfo'
import ReportModal from '@/components/reviews/report-modal'
import ButtonLight from '@/components/ui/button-light'
import {classNames} from '@/util/helper-functions'
import {Review} from '@/util/interfaces'
import {StarIcon} from '@heroicons/react/solid'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {SWRConfig} from 'swr'

const Landlord = ({
	landlord,
	reviews,
}: {
	landlord: string
	reviews: Review[]
}) => {
	if (!reviews) return <div>Error Finding Landlord</div>

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
	console.log(reviews)
	return (
		<SWRConfig value={{fallback}}>
			<LandlordPage landlord={landlord} />
		</SWRConfig>
	)
}

export async function getStaticPaths() {
	const req = await fetch(`http://backend:8080/review/landlords`)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data: string[] = await req.json()

	const paths = data.map((landlord) => ({
		params: {landlord: encodeURIComponent(landlord)},
	}))

	console.log('Paths: ', paths)

	return {
		paths: paths,
		fallback: true,
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
