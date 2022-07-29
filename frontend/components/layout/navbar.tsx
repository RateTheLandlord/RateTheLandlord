import {Disclosure} from '@headlessui/react'
import {SearchIcon} from '@heroicons/react/solid'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import Logo from '../svg/logo/logo'
import Link from 'next/link'
import {useTranslation} from 'react-i18next'

//TODO Apply "Current" styling to Navbar as necessary

export default function Navbar(): JSX.Element {
	const {t} = useTranslation()
	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({open}) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
						<div className="flex justify-between h-16">
							<div className="flex px-2 lg:px-0">
								<div className="flex-shrink-0 flex items-center gap-4">
									<Logo styling="h-8 w-auto" />
									<Link href="/">
										<a>{t('layout.nav.title')}</a>
									</Link>
								</div>
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link href="/reviews">
										<a className="border-teal-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
											{t('layout.nav.reviews')}
										</a>
									</Link>
								</div>
							</div>
							<div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
								<div className="max-w-lg w-full lg:max-w-xs">
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
								</div>
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link href="/create-review">
										<a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
											{t('layout.nav.submit')}
										</a>
									</Link>
								</div>
							</div>
							<div className="flex items-center lg:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
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
						<div className="pt-2 pb-3 space-y-1">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
							<Link href="/reviews">
								<Disclosure.Button
									as="a"
									className="bg-teal-50 border-teal-500 text-teal-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
								>
									{t('layout.nav.reviews')}
								</Disclosure.Button>
							</Link>
							<Link href="/create-review">
								<Disclosure.Button
									as="a"
									className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
								>
									{t('layout.nav.submit')}
								</Disclosure.Button>
							</Link>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
