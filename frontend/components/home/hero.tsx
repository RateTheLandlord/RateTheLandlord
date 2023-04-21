//This component will be for the Home page. It's layout will be determined by the Figma design

import {useTranslation} from 'react-i18next'
import LinkButtonLG from '../ui/link-button-lg'
import LinkButtonLightLG from '../ui/link-button-light-lg'
import Github from '../svg/social/github'
import Instagram from '../svg/social/instagram'
import TikTok from '../svg/social/tiktok'
import Twitter from '../svg/social/twitter'

const navigation = [
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/ratethelandlord',
		icon: () => <Instagram />,
	},
	{
		name: 'Twitter',
		href: 'https://twitter.com/r8thelandlord',
		icon: () => <Twitter />,
	},
	{
		name: 'TikTok',
		href: 'https://www.tiktok.com/@ratethelandlord',
		icon: () => <TikTok />,
	},
]

function Hero(): JSX.Element {
	const {t} = useTranslation('home')
	return (
		<div data-testid="home-hero-1" className="relative min-w-full">
			<div className="relative pt-6">
				<main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
					<div className="text-center">
						<h1 className="block text-4xl font-extrabold  tracking-tight text-teal-600 sm:text-5xl md:text-6xl">
							{t('home.hero.title')}
						</h1>
						<p className="mx-auto mt-3 max-w-md text-base  sm:text-lg md:mt-5 md:max-w-full md:text-xl">
							{t('home.hero.body')}
						</p>
						<div className="my-10 flex flex-col gap-4 rounded-lg bg-green-200 p-4">
							<p className="mx-auto w-full text-base sm:text-lg md:w-3/5 md:text-xl">
								Hey there Tenant! <br />
								<br />
								You&apos;ll notice our website is on pause temporarily. Rest
								assured the reviews will be visible again very soon.
								<br />
								<br />
								We are thrilled to announce that we have received over 1,000
								reviews in just one week! Thank you for submitting your reviews
								and keeping your community informed. We appreciate your
								enthusiasm and support for our website.
								<br />
								<br />
								Unfortunately, in order to accommodate all this new information,
								we need to take some time to get our website in order to better
								serve everyone! <br />
								<br />
								In the meantime, follow us on social media and stay alert for
								our re-launch coming very soon!
							</p>
							<div className="flex justify-center space-x-6 md:order-2">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="text-gray-400 hover:text-gray-500"
									>
										<span className="sr-only">{item.name}</span>
										<item.icon aria-hidden="true" />
									</a>
								))}
							</div>
						</div>
						<div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
							{/* <LinkButtonLG href="/create-review">
								{t('home.hero.submit')}
							</LinkButtonLG>
							<LinkButtonLightLG href="/reviews">
								{t('home.hero.read')}
							</LinkButtonLightLG> */}
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Hero
