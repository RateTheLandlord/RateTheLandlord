import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import Logo from '../svg/logo/logo'
import Link from 'next/link'
import {useTranslation} from 'react-i18next'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {parseCookies} from 'nookies'
import {updateUser} from '@/redux/user/userSlice'
import MobileNav from '@/components/layout/MobileNav'
import {navigation, socialLinks} from '@/components/layout/links'

interface IResult {
	id: number
	name: string
	email: string
	blocked: boolean
	role: string
}

export default function Navbar(): JSX.Element {
	const cookies = parseCookies()
	const {t} = useTranslation('layout')

	const [activeTab, setActiveTab] = useState<string>('/')
	const router = useRouter()

	const user = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const urlString = router.pathname
		if (urlString.includes('reviews')) {
			setActiveTab('/reviews')
		} else if (urlString.includes('about')) {
			setActiveTab('/about')
		} else if (urlString.includes('create')) {
			setActiveTab('/create-review')
		} else if (urlString.includes('resources')) {
			setActiveTab('/resources')
		} else if (urlString.includes('admin')) {
			setActiveTab('/admin')
		} else {
			setActiveTab('/')
		}
	}, [router])

	useEffect(() => {
		const userID = localStorage.getItem('rtlUserId')
		if (cookies.ratethelandlord && userID) {
			fetch('/api/get-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({id: userID}),
			})
				.then((result: Response) => {
					if (!result.ok) {
						throw new Error()
					}
					return result.json()
				})
				.then((data: IResult) => {
					const userInfo = {
						jwt: {
							access_token: cookies.ratethelandlord,
						},
						result: {
							...data,
						},
					}
					dispatch(updateUser(userInfo))
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [cookies.ratethelandlord])

	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({open}) => (
				<>
					<div
						className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8"
						data-testid="navbar-1"
					>
						<div className="flex h-16 justify-between">
							<div className="flex px-2 lg:px-0">
								<div className="flex flex-shrink-0 items-center gap-4">
									<Logo styling="h-8 w-auto" />
									<Link href="/">
										<a data-umami-event="navbar Rate The Landlord link">{t('layout.nav.title')}</a>
									</Link>
								</div>
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{navigation.map((link) => (
										<Link key={link.href} href={link.href}>
											<a
												data-umami-event={link.umami}
												className={`${
													activeTab === link.href
														? 'border-b-2 border-teal-500'
														: ''
												} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
											>
												{t(link.name)}
											</a>
										</Link>
									))}
									{user?.jwt.access_token && (
										<Link href={`/admin/${user.result.id || 0}`}>
											<a
												className={`${
													activeTab === '/admin'
														? 'border-b-2 border-teal-500'
														: ''
												} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
											>
												Admin
											</a>
										</Link>
									)}
								</div>
							</div>
							<div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
								<div className="hidden justify-center space-x-6 lg:flex">
									{socialLinks.map((item) => (
										<a
											data-umami-event={item.umami}
											key={item.name}
											href={item.href}
											className="text-gray-400 hover:text-gray-500"
										>
											<span className="sr-only">{item.name}</span>
											{item.icon}
										</a>
									))}
								</div>
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									<Link href="/create-review">
										<a data-umami-event="navbar Submit a Review button" className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
											{t('layout.nav.submit')}
										</a>
									</Link>
								</div>
							</div>
							<div className="flex items-center lg:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
									<span className="sr-only">{t('layout.nav.open')}</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex items-center lg:hidden"></div>
						</div>
					</div>

					<MobileNav navigation={navigation} activeTab={activeTab} />
				</>
			)}
		</Disclosure>
	)
}