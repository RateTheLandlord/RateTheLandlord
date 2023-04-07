import ReviewForm from '@/components/create-review/review-form'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import React from 'react'

function CreateReview(): JSX.Element {
	const title = 'Create Review | Rate The Landlord'
	const desc =
		'Share information with tenants like you. We are a community platform that elevates tenant voices to promote landlord accountability.'

	const siteURL = 'https://ratethelandlord.org'
	const pathName = useRouter().pathname
	const pageURL = pathName === '/' ? siteURL : siteURL + pathName
	const twitterHandle = '@r8thelandlord'
	const siteName = 'RateTheLandlord.org'
	return (
		<div
			className="w-full flex justify-center"
			data-testid="create-review-form-1"
		>
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
			<div className="flex flex-col">
				<ReviewForm />
			</div>
		</div>
	)
}

export default CreateReview
