import {ILinks, INav} from '@/util/interfaces/interfaces'
import Instagram from '@/components/svg/social/instagram'
import Twitter from '@/components/svg/social/twitter'
import TikTok from '@/components/svg/social/tiktok'

export const navigation: Array<INav> = [
	{
		href: '/reviews',
		name: 'layout.nav.reviews',
	},
	{
		href: '/resources',
		name: 'layout.nav.resources',
	},
	{
		href: '/about',
		name: 'layout.nav.about',
	},
]

export const socialLinks: Array<ILinks> = [
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/ratethelandlord',
		icon: <Instagram />,
	},
	{
		name: 'Twitter',
		href: 'https://twitter.com/r8thelandlord',
		icon: <Twitter />,
	},
	{
		name: 'TikTok',
		href: 'https://www.tiktok.com/@ratethelandlord',
		icon: <TikTok />,
	},
]