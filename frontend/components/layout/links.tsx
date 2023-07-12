import {ILinks, INav} from '@/util/interfaces/interfaces'
import Instagram from '@/components/svg/social/instagram'
import Twitter from '@/components/svg/social/twitter'
import TikTok from '@/components/svg/social/tiktok'

export const navigation: Array<INav> = [
	{
		href: '/reviews',
		name: 'layout.nav.reviews',
		umami: 'Navbar / Reviews Link',
		mobileumami: 'Mobile Navbar / Reviews Link'
	},
	{
		href: '/resources',
		name: 'layout.nav.resources',
		umami: 'Navbar / Resources link',
		mobileumami: 'Mobile Navbar / Resources Link'
	},
	{
		href: '/about',
		name: 'layout.nav.about',
		umami: 'Navbar / About Link',
		mobileumami: 'Mobile Navbar / About Link'
	},
]

export const socialLinks: Array<ILinks> = [
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/ratethelandlord',
		icon: <Instagram />,
		umami: "Navbar / Instagram Icon"
	},
	{
		name: 'Twitter',
		href: 'https://twitter.com/r8thelandlord',
		icon: <Twitter />,
		umami: "Navbar / Twitter Icon"
	},
	{
		name: 'TikTok',
		href: 'https://www.tiktok.com/@ratethelandlord',
		icon: <TikTok />,
		umami: "Navbar / TikTok Icon"
	},
]