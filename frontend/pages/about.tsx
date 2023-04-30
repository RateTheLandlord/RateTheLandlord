import AboutUs from '@/components/about/aboutUs'
import Contact from '@/components/about/contact'
import Contributing from '@/components/about/contributing'
import Faq from '@/components/about/faq'
import Moderation from '@/components/about/moderation'
import Privacy from '@/components/about/privacy'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import React from 'react'

function About(): JSX.Element {
	const title = 'About | Rate The Landlord'
	const desc =
		'Share information with tenants like you. We are a community platform that elevates tenant voices to promote landlord accountability.'

	const siteURL = 'https://ratethelandlord.org'
	const pathName = useRouter().pathname
	const pageURL = pathName === '/' ? siteURL : siteURL + pathName
	const twitterHandle = '@r8thelandlord'
	const siteName = 'RateTheLandlord.org'
	return (
		<div className="w-full flex justify-center">
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
			<div className="flex flex-col container items-center gap-4 mt-5 px-2">
				<AboutUs />
				<Faq />
				<Privacy />
				<Moderation />
				<Contact />
				<Contributing />
			</div>
		</div>
	)
}

export default About
