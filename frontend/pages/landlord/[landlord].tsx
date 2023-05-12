import LandlordPage from '@/components/landlord/LandlordPage'
import {Review} from '@/util/interfaces'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'

interface IProps {
	landlord: string
	reviews: Review[]
}

const Landlord = ({landlord, reviews}: IProps) => {
	const title = `${landlord} Reviews | Rate The Landlord`
	const desc = `Reviews for ${landlord}. Read ${reviews?.length} reviews for ${landlord}. Rate the Landlord is a community platform that elevates tenant voices to promote landlord accountability.`
	const siteURL = 'https://ratethelandlord.org'
	const pathName = useRouter().pathname
	const pageURL = pathName === '/' ? siteURL : siteURL + pathName
	const twitterHandle = '@r8thelandlord'
	const siteName = 'RateTheLandlord.org'

	if (!reviews) return <div>Error Finding Landlord</div>

	return (
		<>
			<NextSeo
				title={title}
				description={desc}
				canonical={pageURL}
				openGraph={{
					type: 'website',
					locale: 'en_CA', //  Default is en_US
					url: pageURL,
					title,
					description: desc,

					site_name: siteName,
				}}
				twitter={{
					handle: twitterHandle,
					site: twitterHandle,
					cardType: 'summary_large_image',
				}}
				additionalMetaTags={[
					{
						property: 'author',
						content: title,
					},
				]}
				additionalLinkTags={[
					{
						rel: 'icon',
						href: `${siteURL}/favicon.ico`,
					},
				]}
			/>

			<LandlordPage landlord={landlord} reviews={reviews} />
		</>
	)
}

export async function getStaticPaths() {
	const req = await fetch(`http://backend:8080/review/landlords`)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data: string[] = await req.json()

	const paths = data.map((landlord) => ({
		params: {landlord: encodeURIComponent(landlord)},
	}))

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
