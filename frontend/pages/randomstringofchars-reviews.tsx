import React from 'react'
import {SWRConfig} from 'swr'
import Review from '@/components/reviews/review'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

export default function Reviews({fallback}: {fallback: Review[]}): JSX.Element {
	const title = 'Reviews | Rate The Landlord'
	const desc =
		'View Landlord Reviews. We are a community platform that elevates tenant voices to promote landlord accountability.'
	const siteURL = 'https://ratethelandlord.org'
	const pathName = useRouter().pathname
	const pageURL = pathName === '/' ? siteURL : siteURL + pathName
	const twitterHandle = '@r8thelandlord'
	const siteName = 'RateTheLandlord.org'
	return (
		<SWRConfig value={{fallback}}>
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
			<Review />
		</SWRConfig>
	)
}

//Page is statically generated at build time and then revalidated at a minimum of every 100 seconds based on when the page is accessed
export async function getStaticProps() {
	try {
		const req = await fetch(`https://ratethelandlord.org/review`)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data: Review[] = await req.json()

		return {
			props: {
				fallback: {
					'/api/get-reviews': data ? data : [],
				},
			},
			revalidate: 100,
		}
	} catch (error) {
		return {
			props: {
				fallback: {
					'/api/get-reviews': [],
				},
			},
			revalidate: 100,
		}
	}
}
