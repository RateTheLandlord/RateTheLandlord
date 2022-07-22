import React, {useState, Fragment} from 'react'
import {Dialog, Popover, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {Options} from '@/util/interfaces'
import SelectList from './ui/select-list'

//Review filters and Logic

interface FiltersProps {
	selectedSort: Options
	setSelectedSort: (selectedSort: Options) => void
	sortOptions: Options[]
	countryFilter: Options | null
	setCountryFilter: (option: Options) => void
	stateFilter: Options | null
	setStateFilter: (option: Options) => void
	cityFilter: Options | null
	setCityFilter: (option: Options) => void
	activeFilters: Options[] | null
	cityOptions: Options[]
	countryOptions: Options[]
	stateOptions: Options[]
	removeFilter: (index: number) => void
}

function ReviewFilters({
	selectedSort,
	setSelectedSort,
	sortOptions,
	countryFilter,
	setCountryFilter,
	stateFilter,
	setStateFilter,
	cityFilter,
	setCityFilter,
	activeFilters,
	cityOptions,
	countryOptions,
	stateOptions,
	removeFilter,
}: FiltersProps): JSX.Element {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)

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
								<div className="flow-root">
									<Popover.Group className="-mx-4 flex flex-col items-center divide-x gap-2 divide-gray-200">
										<SelectList
											state={countryFilter}
											setState={setCountryFilter}
											options={countryOptions}
											name="Country"
										/>
										<SelectList
											state={stateFilter}
											setState={setStateFilter}
											options={stateOptions}
											name="State / Province"
										/>
										<SelectList
											state={cityFilter}
											setState={setCityFilter}
											options={cityOptions}
											name="City"
										/>
									</Popover.Group>
								</div>
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
									<Popover.Group className="-mx-4 flex items-center divide-x gap-2 divide-gray-200">
										<SelectList
											state={countryFilter}
											setState={setCountryFilter}
											options={countryOptions}
											name="Country"
										/>
										<SelectList
											state={stateFilter}
											setState={setStateFilter}
											options={stateOptions}
											name="State / Province"
										/>
										<SelectList
											state={cityFilter}
											setState={setCityFilter}
											options={cityOptions}
											name="City"
										/>
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
									{activeFilters?.length
										? activeFilters.map((activeFilter, index) => (
												<span
													key={activeFilter.name}
													className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
												>
													<span>{activeFilter.name}</span>
													<button
														onClick={() => removeFilter(index)}
														type="button"
														className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
													>
														<span className="sr-only">
															Remove filter for {activeFilter.name}
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
										  ))
										: null}
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
