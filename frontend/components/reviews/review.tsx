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
import Paginator from './paginator'

export type ReviewsResponse = {
	reviews: Review[]
	total: number
	countries: string[]
	states: string[]
	cities: string[]
	zips: string[]
	limit: number
}

const country_codes: string[] = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US' || c === 'GB' || c === 'AU' || c === 'NZ',
)

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const Review = () => {
	const [selectedSort, setSelectedSort] = useState<Options>(sortOptions[2])

	const [searchState, setSearchState] = useState<string>('')
	const [page, setPage] = useState<number>(1)

	const [countryFilter, setCountryFilter] = useState<Options | null>(null)
	const [stateFilter, setStateFilter] = useState<Options | null>(null)
	const [cityFilter, setCityFilter] = useState<Options | null>(null)
	const [zipFilter, setZipFilter] = useState<Options | null>(null)
	const [activeFilters, setActiveFilters] = useState<Options[] | null>(null)

	const queryParams = new URLSearchParams({
		page: page.toString(),
		sort: selectedSort.value,
		state: stateFilter?.value || '',
		country: countryFilter?.value || '',
		city: cityFilter?.value || '',
		zip: zipFilter?.value || '',
		search: searchState || '',
		limit: '25',
	})

	const {data} = useSWR<ReviewsResponse>(
		`/api/get-reviews?${queryParams.toString()}`,
		fetcher,
	)

	const [reviews, setReviews] = useState<Review[]>(data?.reviews || [])
	const [reportOpen, setReportOpen] = useState<boolean>(false)

	const [selectedReview, setSelectedReview] = useState<Review | undefined>()

	useEffect(() => {
		if (data) {
			setReviews(data.reviews)
		}
	}, [data])

	const countryOptions: Options[] = country_codes.map(
		(item: string, ind: number): Options => {
			return {id: ind + 1, name: countries[item] as string, value: item}
		},
	)

	const cityOptions = getCityOptions(data?.cities ?? [])
	const stateOptions = getStateOptions(data?.states ?? [])
	const zipOptions = getZipOptions(data?.zips ?? [])

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
				<Paginator
					onSelect={(page: number) => setPage(page)}
					currentPage={page}
					totalPages={data?.total ?? 0}
					limit={data?.limit ?? 25}
				/>
			</div>
		</>
	)
}

export default Review
