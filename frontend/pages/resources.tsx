import ResourcesInfo from '@/components/resources/resourcesInfo'
import ResourceTenantLinks from '@/components/resources/resourcesLinks'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'

function Resources(): JSX.Element {
	const title = 'Resources | Rate The Landlord'
	const desc =
		'Find resources for Tenants. We are a community platform that elevates tenant voices to promote landlord accountability.'

	const siteURL = 'https://ratethelandlord.org'
	const pathName = useRouter().pathname
	const pageURL = pathName === '/' ? siteURL : siteURL + pathName
	const twitterHandle = '@r8thelandlord'
	const siteName = 'RateTheLandlord.org'
	return (
		<div className="flex w-full justify-center">
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
				additionalLinkTags={[
					{
						rel: 'icon',
						href: `${siteURL}/favicon.ico`,
					},
				]}
			/>
			<div className="container mt-5 flex flex-col items-center gap-4 px-2">
				<ResourcesInfo />
				<ResourceTenantLinks />
			</div>
		</div>
	)
}

export default Resources
