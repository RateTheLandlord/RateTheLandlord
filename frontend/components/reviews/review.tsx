import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {sortOptions} from '@/util/filter-options'
import {Options, Review} from '@/util/interfaces'
import {
	updateActiveFilters,
	getStateOptions,
	getCityOptions,
	getZipOptions,
} from '@/components/reviews/functions'
import countries from '@/util/countries.json'
import React, {useEffect, useState} from 'react'
import ReportModal from '@/components/reviews/report-modal'
import Head from 'next/head'
import useSWR from 'swr'

const country_codes: string[] = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US' || c === 'GB',
)

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const Review = () => {
	const [selectedSort, setSelectedSort] = useState<Options>(sortOptions[2])
	const [countryFilter, setCountryFilter] = useState<Options | null>(null)
	const [stateFilter, setStateFilter] = useState<Options | null>(null)
	const [cityFilter, setCityFilter] = useState<Options | null>(null)
	const [zipFilter, setZipFilter] = useState<Options | null>(null)
	const [activeFilters, setActiveFilters] = useState<Options[] | null>(null)
	const [searchState, setSearchState] = useState<string>('')

	const queryParams = new URLSearchParams({
		sort: selectedSort.value,
		state: stateFilter?.value || '',
		country: countryFilter?.value || '',
		city: cityFilter?.value || '',
		zip: zipFilter?.value || '',
		search: searchState || '',
	})

	const {data} = useSWR<Array<Review>>(
		`/api/get-reviews?${queryParams.toString()}`,
		fetcher,
	)

	const [reportOpen, setReportOpen] = useState<boolean>(false)

	const [selectedReview, setSelectedReview] = useState<Review | undefined>()

	const [reviews, setReviews] = useState<Review[]>(data || [])

	useEffect(() => {
		if (data) {
			setReviews(data)
		}
	}, [data])

	const countryOptions: Options[] = country_codes.map(
		(item: string, ind: number): Options => {
			return {id: ind + 1, name: countries[item] as string, value: item}
		},
	)

	const cityOptions = getCityOptions(data)

	const stateOptions = getStateOptions(data)

	const zipOptions = getZipOptions(data)

	const removeFilter = (index: number) => {
		if (activeFilters?.length) {
			if (cityFilter === activeFilters[index]) setCityFilter(null)
			if (stateFilter === activeFilters[index]) setStateFilter(null)
			if (countryFilter === activeFilters[index]) setCountryFilter(null)
			if (zipFilter === activeFilters[index]) setZipFilter(null)
		}
	}

	useEffect(() => {
		setActiveFilters(
			updateActiveFilters(countryFilter, stateFilter, cityFilter, zipFilter),
		)
	}, [
		cityFilter,
		stateFilter,
		countryFilter,
		zipFilter,
		searchState,
		selectedSort,
	])

	useEffect(() => {
		if (data) {
			setReviews(data)
		}
	}, [data])

	return (
		<>
			<Head>
				<title>Reviews | Rate The Landlord</title>
			</Head>
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
					zipFilter={zipFilter}
					setZipFilter={setZipFilter}
					cityOptions={cityOptions}
					stateOptions={stateOptions}
					countryOptions={countryOptions}
					zipOptions={zipOptions}
					removeFilter={removeFilter}
					setSearchState={setSearchState}
				/>
				<ReviewTable
					data={reviews}
					setReportOpen={setReportOpen}
					setSelectedReview={setSelectedReview}
				/>
			</div>
		</>
	)
}

export default Review
