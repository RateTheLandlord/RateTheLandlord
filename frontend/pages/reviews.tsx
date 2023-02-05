import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {sortOptions} from '@/util/filter-options'
import {Options, Review} from '@/util/interfaces'
import {
	sortAZ,
	sortZA,
	updateActiveFilters,
	updateReviews,
	getStateOptions,
	getCityOptions,
} from '@/components/reviews/functions'
import countries from '@/util/countries.json'
import React, {useEffect, useState} from 'react'
import ReportModal from '@/components/reviews/report-modal'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

const country_codes: string[] = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US',
)

export default function Reviews({data}: {data: Review[]}): JSX.Element {
	const initialData = data
	const [allReviews, setAllReviews] = useState<Review[]>(initialData)
	const [reviews, setReviews] = useState<Review[]>(initialData)

	const [selectedSort, setSelectedSort] = useState<Options>(sortOptions[0])
	const [countryFilter, setCountryFilter] = useState<Options | null>(null)
	const [stateFilter, setStateFilter] = useState<Options | null>(null)
	const [cityFilter, setCityFilter] = useState<Options | null>(null)
	const [activeFilters, setActiveFilters] = useState<Options[] | null>(null)
	const [searchState, setSearchState] = useState<string>('')

	const [reportOpen, setReportOpen] = useState<boolean>(false)

	const [selectedReview, setSelectedReview] = useState<Review | undefined>()

	const countryOptions: Options[] = country_codes.map(
		(item: string, ind: number): Options => {
			return {id: ind + 1, name: countries[item] as string, value: item}
		},
	)

	const cityOptions = getCityOptions(reviews)

	const stateOptions = getStateOptions(reviews)

	const removeFilter = (index: number) => {
		if (activeFilters?.length) {
			if (cityFilter === activeFilters[index]) setCityFilter(null)
			if (stateFilter === activeFilters[index]) setStateFilter(null)
			if (countryFilter === activeFilters[index]) setCountryFilter(null)
		}
	}

	useEffect(() => {
		updateActiveFilters(
			countryFilter,
			stateFilter,
			cityFilter,
			setActiveFilters,
		)
		updateReviews(
			stateFilter,
			countryFilter,
			cityFilter,
			setReviews,
			allReviews,
			searchState,
		)
	}, [cityFilter, stateFilter, countryFilter, allReviews, searchState])

	useEffect(() => {
		if (selectedSort.name === 'Name A-Z') {
			setReviews((reviews) => sortAZ(reviews))
		} else if (selectedSort.name === 'Name Z-A') {
			setReviews((reviews) => sortZA(reviews))
		}
	}, [selectedSort])

	useEffect(() => {
		if (data) {
			setReviews(data)
			setAllReviews(data)
		}
	}, [data])

	return (
		<>
			<ReportModal
				isOpen={reportOpen}
				setIsOpen={setReportOpen}
				selectedReview={selectedReview}
			/>
			<div className="w-full">
				<ReviewFilters
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
					sortOptions={sortOptions}
					activeFilters={activeFilters}
					countryFilter={countryFilter}
					setCountryFilter={setCountryFilter}
					stateFilter={stateFilter}
					setStateFilter={setStateFilter}
					cityFilter={cityFilter}
					setCityFilter={setCityFilter}
					cityOptions={cityOptions}
					stateOptions={stateOptions}
					countryOptions={countryOptions}
					removeFilter={removeFilter}
					setSearchState={setSearchState}
				/>
				<ReviewTable
					data={reviews || initialData}
					setReportOpen={setReportOpen}
					setSelectedReview={setSelectedReview}
				/>
			</div>
		</>
	)
}

//Page is statically generated at build time and then revalidated at a minimum of every 30 minutes based on when the page is accessed
export async function getStaticProps() {
	const req = await fetch(`http://localhost/nest/review`)

	if (req.ok) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const res: Review[] = await req.json()
		return {
			props: {
				data: res,
			},
			revalidate: 1800,
		}
	} else {
		return {
			props: {data: []},
			revalidate: 1800,
		}
	}
}
