import React from 'react'
import Facebook from '../svg/social/facebook'
import Instagram from '../svg/social/instagram'
import TikTok from '../svg/social/tiktok'
import Twitter from '../svg/social/twitter'

const navigation = [
	{
		name: 'Facebook',
		href: '#',
		icon: (props) => <Facebook />,
	},
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/ratethelandlord',
		icon: (props) => <Instagram />,
	},
	{
		name: 'Twitter',
		href: 'https://twitter.com/r8thelandlord',
		icon: (props) => <Twitter />,
	},
	{
		name: 'TikTok',
		href: 'https://www.tiktok.com/@ratethelandlord',
		icon: (props) => <TikTok />,
	},
]

function Footer(): JSX.Element {
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
							<item.icon className="h-6 w-6" aria-hidden="true" />
						</a>
					))}
				</div>
				<div className="mt-8 md:mt-0 md:order-1">
					<p className="text-center text-base text-gray-400">
						&copy; 2022 Rate The Landlord. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
