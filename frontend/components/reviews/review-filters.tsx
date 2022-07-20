import React, {useState, Fragment} from 'react'
import {
	Dialog,
	Disclosure,
	Listbox,
	Popover,
	Transition,
} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {classNames} from '@/util/classnames'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {NewFilter, Options} from '@/util/interfaces'
import SelectList from './ui/select-list'

import {
	countryOptions,
	sortOptions,
	stateOptions,
	cityOptions,
} from '@/util/filter-options'

//Review filters and Logic

interface FiltersProps {
	selectedSort: Options
	setSelectedSort: (selectedSort: Options) => void
	sortOptions: Options[]
	activeFilters: NewFilter[]
	setActiveFilters: (activeFilters: NewFilter) => void
}

function ReviewFilters({
	activeFilters,
	selectedSort,
	setSelectedSort,
	sortOptions,
	setActiveFilters,
}: FiltersProps): JSX.Element {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)
	const [displayFilters, setDisplayFilters] = useState<NewFilter[]>([])

	return (
		<div>
			{/* Mobile filter dialog */}
			<Transition.Root show={mobileFiltersOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-40 sm:hidden"
					onClose={setMobileFiltersOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 flex z-40">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
								<div className="px-4 flex items-center justify-between">
									<h2 className="text-lg font-medium text-gray-900">Filters</h2>
									<button
										type="button"
										className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
										onClick={() => setMobileFiltersOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{/* Filters */}
								<form className="mt-4">
									{filters.map((section) => (
										<Disclosure
											as="div"
											key={section.name}
											className="border-t border-gray-200 px-4 py-6"
										>
											{({open}) => (
												<>
													<h3 className="-mx-2 -my-3 flow-root">
														<Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
															<span className="font-medium text-gray-900">
																{section.name}
															</span>
															<span className="ml-6 flex items-center">
																<ChevronDownIcon
																	className={classNames(
																		open ? '-rotate-180' : 'rotate-0',
																		'h-5 w-5 transform',
																	)}
																	aria-hidden="true"
																/>
															</span>
														</Disclosure.Button>
													</h3>
													<Disclosure.Panel className="pt-6">
														<div className="space-y-6">
															{section.options.map((option, optionIdx) => (
																<div
																	key={option.value}
																	className="flex items-center"
																>
																	<input
																		id={`filter-mobile-${section.id}-${optionIdx}`}
																		name={`${section.id}[]`}
																		defaultValue={option.value}
																		type="checkbox"
																		defaultChecked={option.checked}
																		className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
																	/>
																	<label
																		htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																		className="ml-3 text-sm text-gray-500"
																	>
																		{option.label}
																	</label>
																</div>
															))}
														</div>
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									))}
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<main>
				<div>
					<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
							Find your landlord
						</h1>
						<p className="mt-4 max-w-xl text-sm text-gray-700">
							Search our database to find information about your landlord. If
							you don&apos;t see a result, be the first to add a review!
						</p>
					</div>
				</div>

				{/* Filters */}
				<section aria-labelledby="filter-heading">
					<h2 id="filter-heading" className="sr-only">
						Filters
					</h2>

					<div className="relative z-10 bg-white border-b border-gray-200 pb-4">
						<div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8">
							<SelectList
								state={selectedSort}
								setState={setSelectedSort}
								options={sortOptions}
								name="Sort By"
							/>
							<button
								type="button"
								className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								Filters
							</button>

							<div className="hidden sm:block">
								<div className="flow-root">
									<Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
										{filters.map((section) => (
											<Popover
												key={section.name}
												className="px-4 relative inline-block text-left"
											>
												<Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
													<span>{section.name}</span>

													<ChevronDownIcon
														className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
												</Popover.Button>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
														<form className="space-y-4">
															{section.options.map((option, optionIdx) => (
																<div
																	key={option.value}
																	className="flex items-center"
																>
																	<input
																		id={`filter-${section.id}-${optionIdx}`}
																		name={`${section.id}`}
																		defaultValue={option.value}
																		type="checkbox"
																		defaultChecked={option.checked}
																		className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
																		onChange={handleChange}
																	/>
																	<label
																		htmlFor={`filter-${section.id}-${optionIdx}`}
																		className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
																	>
																		{option.label}
																	</label>
																</div>
															))}
														</form>
													</Popover.Panel>
												</Transition>
											</Popover>
										))}
									</Popover.Group>
								</div>
							</div>
						</div>
					</div>

					{/* Active filters */}
					<div className="bg-gray-100">
						<div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
							<h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
								Filters
								<span className="sr-only">, active</span>
							</h3>

							<div
								aria-hidden="true"
								className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
							/>

							<div className="mt-2 sm:mt-0 sm:ml-4">
								<div className="-m-1 flex flex-wrap items-center">
									{displayFilters.map((activeFilter) => (
										<span
											key={activeFilter.value}
											className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
										>
											<span>{activeFilter.label}</span>
											<button
												type="button"
												className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
											>
												<span className="sr-only">
													Remove filter for {activeFilter.label}
												</span>
												<svg
													className="h-2 w-2"
													stroke="currentColor"
													fill="none"
													viewBox="0 0 8 8"
												>
													<path
														strokeLinecap="round"
														strokeWidth="1.5"
														d="M1 1l6 6m0-6L1 7"
													/>
												</svg>
											</button>
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default ReviewFilters
