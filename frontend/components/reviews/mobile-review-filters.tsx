import React, {Fragment} from 'react'
import {Dialog, Popover, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import MobileSelectList from './ui/mobile-select-list'
import SearchBar from './ui/searchbar'
import {Options} from '@/util/interfaces'
import {useTranslation} from 'react-i18next'

interface FiltersProps {
	mobileFiltersOpen: boolean
	setMobileFiltersOpen: (bool: boolean) => void
	countryFilter: Options | null
	setCountryFilter: (option: Options) => void
	stateFilter: Options | null
	setStateFilter: (option: Options) => void
	cityFilter: Options | null
	setCityFilter: (option: Options) => void
	zipFilter: Options | null
	setZipFilter: (option: Options) => void
	cityOptions: Options[]
	countryOptions: Options[]
	stateOptions: Options[]
	zipOptions: Options[]
	setSearchState: (str: string) => void
}

export default function MobileReviewFilters({
	mobileFiltersOpen,
	setMobileFiltersOpen,
	countryFilter,
	setCountryFilter,
	stateFilter,
	setStateFilter,
	cityFilter,
	setCityFilter,
	zipFilter,
	setZipFilter,
	cityOptions,
	countryOptions,
	stateOptions,
	zipOptions,
	setSearchState,
}: FiltersProps) {
	const {t} = useTranslation('reviews')
	return (
		<Transition.Root show={mobileFiltersOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-40 lg:hidden"
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

				<div className="fixed inset-0 flex z-40" data-testid="mobile-review-filters-1">
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
								<h2 className="text-lg font-medium text-gray-900">
									{t('reviews.filters')}
								</h2>
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
							<div className="mt-4">
								<Popover.Group className="mx-2 flex flex-col items-center divide-y gap-2">
									<SearchBar setSearchState={setSearchState} />

									<MobileSelectList
										state={countryFilter}
										setState={setCountryFilter}
										options={countryOptions}
										name={t('reviews.country')}
									/>
									<MobileSelectList
										state={stateFilter}
										setState={setStateFilter}
										options={stateOptions}
										name={t('reviews.state')}
									/>
									<MobileSelectList
										state={cityFilter}
										setState={setCityFilter}
										options={cityOptions}
										name={t('reviews.city')}
									/>
									<MobileSelectList
										state={zipFilter}
										setState={setZipFilter}
										options={zipOptions}
										name={t('reviews.zip')}
									/>
								</Popover.Group>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
