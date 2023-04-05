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
	sortNewest,
	sortOldest,
} from '@/components/reviews/functions'
import countries from '@/util/countries.json'
import React, {useEffect, useState} from 'react'
import ReportModal from '@/components/reviews/report-modal'
import Head from 'next/head'
import useSWR from 'swr'

const country_codes: string[] = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US',
)

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const Review = () => {
	const {data} = useSWR<Array<Review>>('/api/get-reviews', fetcher)
	const initialData = data
	const [allReviews, setAllReviews] = useState<Review[]>(initialData || [])
	const [reviews, setReviews] = useState<Review[]>(initialData || [])

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
			const sort = sortAZ(reviews)
			setReviews(sort)
		} else if (selectedSort.name === 'Name Z-A') {
			const sort = sortZA(reviews)
			setReviews(sort)
		} else if (selectedSort.name === 'Newest') {
			const sort = sortNewest(reviews)
			setReviews(sort)
		} else if (selectedSort.name === 'Oldest') {
			const sort = sortOldest(reviews)
			setReviews(sort)
		}
	}, [selectedSort, reviews])

	useEffect(() => {
		if (data) {
			setReviews(data)
			setAllReviews(data)
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
					cityOptions={cityOptions}
					stateOptions={stateOptions}
					countryOptions={countryOptions}
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
