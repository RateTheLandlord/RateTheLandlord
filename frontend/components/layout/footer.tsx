import React from 'react'
import {useTranslation} from 'react-i18next'
import Facebook from '../svg/social/facebook'
import Github from '../svg/social/github'
import Instagram from '../svg/social/instagram'
import TikTok from '../svg/social/tiktok'
import Twitter from '../svg/social/twitter'

const navigation = [
	{
		name: 'Facebook',
		href: '#',
		icon: () => <Facebook />,
	},
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
	{
		name: 'Github',
		href: 'https://github.com/RateTheLandlord',
		icon: () => <Github />,
	},
]

function Footer(): JSX.Element {
	const date = new Date()
	const year = date.getFullYear()
	const {t} = useTranslation()
	return (
		<footer className="bg-white">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
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
				<div className="mt-8 md:mt-0 md:order-1">
					<p className="text-center text-base text-gray-400">
						&copy; {year} {t('layout.footer.copy')}
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
