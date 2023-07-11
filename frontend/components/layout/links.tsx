import {ILinks, INav} from '@/util/interfaces/interfaces'
import Instagram from '@/components/svg/social/instagram'
import Twitter from '@/components/svg/social/twitter'
import TikTok from '@/components/svg/social/tiktok'

export const navigation: Array<INav> = [
	{
		href: '/reviews',
		name: 'layout.nav.reviews',
		umami: 'navbar Reviews link',
		mobileumami: 'mobile navbar Reviews link'
	},
	{
		href: '/resources',
		name: 'layout.nav.resources',
		umami: 'navbar Resources link',
		mobileumami: 'mobile navbar Resources link'
	},
	{
		href: '/about',
		name: 'layout.nav.about',
		umami: 'navbar About link',
		mobileumami: 'mobile navbar About link'
	},
]

export const socialLinks: Array<ILinks> = [
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/ratethelandlord',
		icon: <Instagram />,
		umami: "navbar Instagram icon"
	},
	{
		name: 'Twitter',
		href: 'https://twitter.com/r8thelandlord',
		icon: <Twitter />,
		umami: "navbar Twitter icon"
	},
	{
		name: 'TikTok',
		href: 'https://www.tiktok.com/@ratethelandlord',
		icon: <TikTok />,
		umami: "navbar TikTok icon"
	},
]