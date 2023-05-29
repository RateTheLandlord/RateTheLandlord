import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import Logo from '../svg/logo/logo'
import Link from 'next/link'
import {useTranslation} from 'react-i18next'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Instagram from '../svg/social/instagram'
import Twitter from '../svg/social/twitter'
import TikTok from '../svg/social/tiktok'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {parseCookies} from 'nookies'
import {updateUser} from '@/redux/user/userSlice'

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

	const [activeTab, setActiveTab] = useState<number>(1)
	const router = useRouter()

	const user = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const urlString = router.pathname
		if (urlString.includes('reviews')) {
			setActiveTab(2)
		} else if (urlString.includes('about')) {
			setActiveTab(3)
		} else if (urlString.includes('create')) {
			setActiveTab(4)
		} else if (urlString.includes('resources')) {
			setActiveTab(5)
		} else if (urlString.includes('admin')) {
			setActiveTab(6)
		} else {
			setActiveTab(1)
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
										<a>{t('layout.nav.title')}</a>
									</Link>
								</div>
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link href="/reviews">
										<a
											className={`${
												activeTab === 2 ? 'border-b-2 border-teal-500' : ''
											} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
										>
											{t('layout.nav.reviews')}
										</a>
									</Link>
									<Link href="/about">
										<a
											className={`${
												activeTab === 3 ? 'border-b-2 border-teal-500' : ''
											} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
										>
											{t('layout.nav.about')}
										</a>
									</Link>
									<Link href="/resources">
										<a
											className={`${
												activeTab === 5 ? 'border-b-2 border-teal-500' : ''
											} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
										>
											{t('layout.nav.resources')}
										</a>
									</Link>
									{user?.jwt.access_token ? (
										<Link href={`/admin/${user.result.id || 0}`}>
											<a
												className={`${
													activeTab === 6 ? 'border-b-2 border-teal-500' : ''
												} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
											>
												Admin
											</a>
										</Link>
									) : null}
								</div>
							</div>
							<div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
								{/* <div className="max-w-lg w-full lg:max-w-xs">
									<label htmlFor="search" className="sr-only">
										{t('layout.nav.search')}
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<SearchIcon
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</div>
										<input
											id="search"
											name="search"
											className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											placeholder="Search"
											type="search"
										/>
									</div>
								</div> */}
								<div className="hidden justify-center space-x-6 lg:flex">
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
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link href="/create-review">
										<a className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
											{t('layout.nav.submit')}
										</a>
									</Link>
								</div>
							</div>
							<div className="flex items-center lg:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
									<span className="sr-only">{t('layout.nav.open')}</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="hidden lg:ml-4 lg:flex lg:items-center"></div>
						</div>
					</div>

					<Disclosure.Panel className="lg:hidden">
						<div className="space-y-1 pt-2 pb-3">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
							<Link href="/reviews">
								<Disclosure.Button
									as="a"
									className={`block cursor-pointer bg-teal-50 py-2 pl-3 pr-4 text-base font-medium text-teal-700 ${
										activeTab === 2 ? 'border-l-4 border-teal-500' : ''
									}`}
								>
									{t('layout.nav.reviews')}
								</Disclosure.Button>
							</Link>
							<Link href="/create-review">
								<Disclosure.Button
									as="a"
									className={`block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 ${
										activeTab === 4 ? 'border-l-4 border-teal-500' : ''
									}`}
								>
									{t('layout.nav.submit')}
								</Disclosure.Button>
							</Link>
							<Link href="/about">
								<Disclosure.Button
									as="a"
									className={`block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 ${
										activeTab === 3 ? 'border-l-4 border-teal-500' : ''
									}`}
								>
									{t('layout.nav.about')}
								</Disclosure.Button>
							</Link>
							<Link href="/resources">
								<Disclosure.Button
									as="a"
									className={`block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 ${
										activeTab === 4 ? 'border-l-4 border-teal-500' : ''
									}`}
								>
									{t('layout.nav.resources')}
								</Disclosure.Button>
							</Link>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}