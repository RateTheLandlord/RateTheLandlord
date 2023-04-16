import Hero from '@/components/home/hero'
import IconSection from '@/components/home/icon-section'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import React from 'react'

//This page should be statically generated at build. No need for Data fetching here

export default function Home(): JSX.Element {
	const title = 'Rate The Landlord'
	const desc =
		'Share information with tenants like you and rate your landlord. We are a community platform that elevates tenant voices to promote landlord accountability. Rate My Landlord'

	const siteURL = 'https://ratethelandlord.org'
	const pathName = useRouter().pathname
	const pageURL = pathName === '/' ? siteURL : siteURL + pathName
	const twitterHandle = '@r8thelandlord'
	const siteName = 'RateTheLandlord.org'

	return (
		<div>
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
			<Hero />
			<IconSection />
		</div>
	)
}
