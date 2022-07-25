import React, {useState} from 'react'
import {Options} from '@/util/interfaces'
import SelectList from './ui/select-list'
import ActiveFilters from './ui/active-filters'
import SearchBar from './ui/searchbar'
import MobileReviewFilters from './mobile-review-filters'

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
	setSearchState: (str: string) => void
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
	setSearchState,
}: FiltersProps): JSX.Element {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)

	return (
		<div>
			{/* Mobile Filters */}
			<MobileReviewFilters
				mobileFiltersOpen={mobileFiltersOpen}
				setMobileFiltersOpen={setMobileFiltersOpen}
				countryFilter={countryFilter}
				setCountryFilter={setCountryFilter}
				countryOptions={countryOptions}
				stateFilter={stateFilter}
				setStateFilter={setStateFilter}
				stateOptions={stateOptions}
				cityFilter={cityFilter}
				setCityFilter={setCityFilter}
				cityOptions={cityOptions}
				setSearchState={setSearchState}
			/>

			<main>
				{/* TITLE AND DESCRIPTION */}
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
						<div className="max-w-7xl mx-auto px-4 flex items-center lg:justify-between lg:px-8">
							<SelectList
								state={selectedSort}
								setState={setSelectedSort}
								options={sortOptions}
								name="Sort By"
							/>
							<button
								type="button"
								className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								Filters
							</button>

							<div className="hidden lg:block">
								<div className="flow-root">
									<div className="-mx-4 flex items-center divide-x gap-2 divide-gray-200">
										<SearchBar setSearchState={setSearchState} />

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
									</div>
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
												<ActiveFilters
													key={activeFilter.value}
													activeFilter={activeFilter}
													index={index}
													removeFilter={removeFilter}
												/>
												// eslint-disable-next-line no-mixed-spaces-and-tabs
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
