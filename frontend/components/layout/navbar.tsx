import {Disclosure} from '@headlessui/react'
import {MenuIcon, SearchIcon, XIcon} from '@heroicons/react/outline'
import Logo from '../svg/logo/logo'
import Link from 'next/link'
import {useTranslation} from 'react-i18next'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

export default function Navbar(): JSX.Element {
	const {t} = useTranslation('layout')

	const [activeTab, setActiveTab] = useState<number>(1)
	const router = useRouter()

	useEffect(() => {
		const urlString = router.pathname
		if (urlString.includes('reviews')) {
			setActiveTab(2)
		} else if (urlString.includes('about')) {
			setActiveTab(3)
		} else if (urlString.includes('create')) {
			setActiveTab(4)
		} else {
			setActiveTab(1)
		}
	}, [router])
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
									<Link
										href="/reviews"
										data-umami-event="Navbar Link to Reviews"
									>
										<a
											className={`${
												activeTab === 2 ? 'border-b-2 border-teal-500' : ''
											} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
										>
											{t('layout.nav.reviews')}
										</a>
									</Link>
									<Link href="/about" data-umami-event="Navbar Link to About">
										<a
											className={`${
												activeTab === 3 ? 'border-b-2 border-teal-500' : ''
											} inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900`}
										>
											{t('layout.nav.about')}
										</a>
									</Link>
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
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link
										href="/create-review"
										data-umami-event="Navbar Link to Create Review"
									>
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
							<Link
								href="/reviews"
								data-umami-event="Mobile Navbar Link to Reviews Page"
							>
								<Disclosure.Button
									as="a"
									className={`block cursor-pointer bg-teal-50 py-2 pl-3 pr-4 text-base font-medium text-teal-700 ${
										activeTab === 2 ? 'border-l-4 border-teal-500' : ''
									}`}
								>
									{t('layout.nav.reviews')}
								</Disclosure.Button>
							</Link>
							<Link
								href="/create-review"
								data-umami-event="Navbar Mobile Link to Create Review"
							>
								<Disclosure.Button
									as="a"
									className={`block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 ${
										activeTab === 4 ? 'border-l-4 border-teal-500' : ''
									}`}
								>
									{t('layout.nav.submit')}
								</Disclosure.Button>
							</Link>
							<Link
								href="/about"
								data-umami-event="Navbar Mobile Link to About"
							>
								<Disclosure.Button
									as="a"
									className={`block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 ${
										activeTab === 3 ? 'border-l-4 border-teal-500' : ''
									}`}
								>
									{t('layout.nav.about')}
								</Disclosure.Button>
							</Link>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
